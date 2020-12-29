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
                activeTintColor: '#e91e63',
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'powderblue' },
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
