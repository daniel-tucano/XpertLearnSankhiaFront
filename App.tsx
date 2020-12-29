import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './app/screens/Login'

const StackNavigator = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator.Navigator>
                <StackNavigator.Screen name="login" component={Login} />
            </StackNavigator.Navigator>
        </NavigationContainer>
    )
}
