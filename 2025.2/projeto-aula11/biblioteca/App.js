import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home';
import AdicionarLivro from './screens/AdicionarLivro';
import EditarLivro from './screens/EditarLivro';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'Página Inicial' }}
        />
        <Stack.Screen 
          name="AdicionarLivro" 
          component={AdicionarLivro}
          options={{ title: 'Adicionar Livro' }}
        />
        <Stack.Screen 
          name="EditarLivro" 
          component={EditarLivro}
          options={{ title: 'Editar Livro' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;