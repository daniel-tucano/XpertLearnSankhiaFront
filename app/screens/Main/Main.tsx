import React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TopBar from '../../components/TopBar'
import { Entypo } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator()

const PlaceHolder = () => <Text>tab</Text>

const Main = () => {
    return (
        <>
            <TopBar />
            <Tab.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    inactiveTintColor: 'grey',
                    activeTintColor: 'black',
                    labelStyle: { fontSize: 10 },
                    style: { backgroundColor: 'white', height: 42 },
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={PlaceHolder}
                    options={{ tabBarLabel: 'Home' }}
                />
                <Tab.Screen
                    name="Treinamento"
                    component={PlaceHolder}
                    options={{ tabBarLabel: 'Treinamento' }}
                />
                <Tab.Screen
                    name="Mercado"
                    component={PlaceHolder}
                    options={{ tabBarLabel: 'Mercado' }}
                />
                <Tab.Screen
                    name="S-Live"
                    component={PlaceHolder}
                    options={{ tabBarLabel: 'S-Live' }}
                />
            </Tab.Navigator>
        </>
    )
}

export default Main
