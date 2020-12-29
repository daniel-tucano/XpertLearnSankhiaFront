import React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const PlaceHolder = () => <Text>tab</Text>

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: 'grey',
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'white' },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={PlaceHolder}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Notifications"
                component={PlaceHolder}
                options={{ tabBarLabel: 'Updates' }}
            />
            <Tab.Screen
                name="Profile"
                component={PlaceHolder}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    )
}

export default Main
