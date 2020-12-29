import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthContext from './contexts/AuthContextDev'

import Main from './screens/Main/Main'
import Profile from './screens/Profile'
import Login from './screens/Login'

const StackNavigator = createStackNavigator()

const Navigator = () => {
    const { isLogged } = useContext(AuthContext)

    return (
        <StackNavigator.Navigator>
            {isLogged ? (
                <>
                    <StackNavigator.Screen
                        name="main"
                        component={Main}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <StackNavigator.Screen name="profile" component={Profile} />
                </>
            ) : (
                <StackNavigator.Screen name="login" component={Login} />
            )}
        </StackNavigator.Navigator>
    )
}

export default Navigator
