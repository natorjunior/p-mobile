	import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CatsScreen from './screens/CatsScreen';
import CryptoScreen from './screens/CryptoScreen';
 
const Tab = createBottomTabNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#9ca3af',
          headerStyle: { backgroundColor: '#1e3c72' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen name="Gatinhos" component={CatsScreen} />
        <Tab.Screen name="Cripto" component={CryptoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}