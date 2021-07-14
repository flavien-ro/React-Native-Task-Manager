import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Components/home'
import Register from './Components/login/Register'
import TaskManager from './Components/taskManager/taskManager'
import CreateTask from './Components/taskManager/taskCreator'
import ModifyTask from './Components/taskManager/modifyTask'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TaskManager" component={TaskManager} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="ModifyTask" component={ModifyTask} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
