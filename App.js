import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/home';
import Profile from './src/profile';
import Chatbot from './src/chatbot';
import Event from './src/event';
import Budget from './src/budget';
import Todo from './src/todo';
import Vendors from './src/vendors';
import Notes from './src/notes';
import Guestlist from './src/guestlist';
import Schedule from './src/schedule';
import { MD3LightTheme as DefaultTheme, IconButton, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#402D5B',
    secondary:'#F78B64',
    background:'white',
  },
};
const Bottomtabs= createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen =()=>(
  <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='Event' component={Event} options={{headerShown:false}}/> 
    <Stack.Screen name='Todo' component={Todo}options={{headerShown:false}}/> 
    <Stack.Screen name='Budget' component={Budget} options={{headerShown:false}}/> 
    <Stack.Screen name='Notes' component={Notes} options={{headerShown:false}}/> 
    <Stack.Screen name='Guestlist' component={Guestlist} options={{headerShown:false}}/> 
    <Stack.Screen name='Vendors' component={Vendors} options={{headerShown:false}}/> 
    <Stack.Screen name='Schedule' component={Schedule} options={{headerShown:false}}/> 


  </Stack.Navigator>
)

export default function App() {
 
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <Bottomtabs.Navigator>
        <Bottomtabs.Screen name = 'Home Screen'component={HomeScreen} options={{
          tabBarIcon:({color,size})=>(
            // <MaterialCommunityIcons name="home" color={color} size={size}/>
            <IconButton icon={require("./assets/images/home.png")} />
          ),
          headerShown:false,

        }}/>
        <Bottomtabs.Screen name = 'Chatbot'component={Chatbot} options={{
           tabBarIcon:({color,size})=>(
            <IconButton icon={require("./assets/images/chatbot.png")} />
          ),
          headerShown:false}}/> 
        <Bottomtabs.Screen name = 'Profile' component={Profile}options={{
           tabBarIcon:({color,size})=>(
           
            <IconButton icon={require("./assets/images/profile.png")} />
          ),
          headerShown:false}}/>
        
      </Bottomtabs.Navigator>

    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
