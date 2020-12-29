import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContextProvider } from './app/contexts/AuthContext'
import Login from './app/screens/Login'
import Main from './app/screens/Main'

const StackNavigator = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <AuthContextProvider>
                <StackNavigator.Navigator>
                    <StackNavigator.Screen name="Login" component={Login} />
                </StackNavigator.Navigator>
            </AuthContextProvider>
        </NavigationContainer>
    )
}
