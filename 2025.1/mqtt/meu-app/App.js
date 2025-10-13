import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  TextInput,
  Button,
  Chip,
  Surface,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Client, Message } from 'paho-mqtt';

// Tema WhatsApp
const theme = {
  ...DefaultTheme,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: '#075E54',       // verde WhatsApp
    background: '#ECE5DD',    // fundo de chat
    surface: '#FFFFFF',       // bolha incoming
    accent: '#25D366',        // botão enviar
    error: '#B00020',
  },
};

// Context MQTT
const MqttContext = createContext();
function MqttProvider({ children }) {
  const clientId = useRef(`mqtt-${Date.now().toString(36)}`).current;
  const clientRef = useRef(null);
  const [connStatus, setConnStatus] = useState('connecting');
  const [subs, setSubs] = useState([]);
  const [msgs, setMsgs] = useState({});

  useEffect(() => {
    const c = new Client('broker.hivemq.com', 8000, '/mqtt', clientId);
    clientRef.current = c;
    const doConnect = () => {
      c.connect({
        timeout: 4,
        cleanSession: true,
        keepAliveInterval: 30,
        onSuccess: () => setConnStatus('connected'),
        onFailure: () => setConnStatus('lost'),
      });
    };
    c.onConnectionLost = () => {
      setConnStatus('lost');
      setTimeout(() => {
        setConnStatus('reconnecting');
        doConnect();
      }, 3000);
    };
    c.onMessageArrived = (msg) => {
      let payload;
      try { payload = JSON.parse(msg.payloadString); }
      catch { payload = { text: msg.payloadString, ts: Date.now() }; }
      const t = msg.destinationName;
      setMsgs(prev => {
        const arr = prev[t] ? [...prev[t]] : [];
        return { ...prev, [t]: [{ value: payload.text, time: new Date().toLocaleTimeString(), mine: false }, ...arr] };
      });
    };
    doConnect();
    return () => c?.isConnected() && c.disconnect();
  }, [clientId]);

  const subscribeTopic = (topic) => {
    if (!clientRef.current || connStatus !== 'connected') return;
    clientRef.current.subscribe(topic, {
      qos: 0,
      onSuccess: () => setSubs(prev => prev.includes(topic) ? prev : [topic, ...prev]),
    });
  };
  const sendMessage = (topic, text) => {
    const ts = Date.now();
    const payload = JSON.stringify({ text, ts });
    const m = new Message(payload);
    m.destinationName = topic;
    clientRef.current.send(m);
    setMsgs(prev => {
      const arr = prev[topic] ? [...prev[topic]] : [];
      return { ...prev, [topic]: [{ value: text, time: new Date().toLocaleTimeString(), mine: true }, ...arr] };
    });
  };

  return (
    <MqttContext.Provider value={{ connStatus, subs, msgs, subscribeTopic, sendMessage }}>
      {children}
    </MqttContext.Provider>
  );
}

// Home
function HomeScreen({ navigation }) {
  const { connStatus, subs, subscribeTopic } = useContext(MqttContext);
  const [topicInput, setTopicInput] = useState('');
  return (
    <SafeAreaView style={styles.root}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Tópicos" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>
      <View style={styles.row}>
        <TextInput
          style={styles.flex}
          placeholder="Novo tópico"
          mode="outlined"
          value={topicInput}
          onChangeText={setTopicInput}
        />
        <Button
          mode="contained"
          onPress={() => { subscribeTopic(topicInput.trim()); setTopicInput(''); }}
          disabled={connStatus !== 'connected' || !topicInput.trim()}
          labelStyle={{ color: '#fff' }}
          style={{ marginLeft: 8, backgroundColor: theme.colors.accent }}
        >+
        </Button>
      </View>
      <View style={styles.chips}>
        {subs.map(t => (
          <Chip
            key={t}
            onPress={() => navigation.navigate('Chat', { topic: t })}
            style={styles.chip}
          >{t}</Chip>
        ))}
      </View>
    </SafeAreaView>
  );
}

// Chat
function ChatScreen({ route, navigation }) {
  const { topic } = route.params;
  const { connStatus, msgs, sendMessage } = useContext(MqttContext);
  const [text, setText] = useState('');
  const thread = msgs[topic] || [];

  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.root}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title={topic} titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <FlatList
        data={thread}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Surface style={[
            styles.bubble,
            item.mine
              ? { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' }
              : { alignSelf: 'flex-start', backgroundColor: colors.surface }
          ]}>
            <Text>{item.value}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </Surface>
        )}
        contentContainerStyle={styles.list}
        inverted
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
        style={{ backgroundColor: '#ECE5DD', padding: 8 }}
      >
        <View style={[styles.row, { backgroundColor: '#ECE5DD' }]}>  
          <TextInput
            style={[styles.flex, { backgroundColor: '#fff', borderRadius: 20 }]}
            placeholder="Digite uma mensagem"
            mode="flat"
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => {
              sendMessage(topic, text);
              setText('');
            }}
          />
          <IconButton
            icon="send"
            size={26}
            onPress={() => { sendMessage(topic, text); setText(''); }}
            disabled={connStatus !== 'connected' || !text.trim()}
            iconColor={theme.colors.accent}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MqttProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MqttProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  flex: { flex: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, paddingTop: 8 },
  chip: { margin: 4, backgroundColor: '#fff' },
  list: { padding: 12 },
  bubble: { maxWidth: '80%', padding: 12, marginBottom: 8, borderRadius: 16, elevation: 0 },
  time: { fontSize: 12, color: '#666', marginTop: 4, textAlign: 'right' },
});
