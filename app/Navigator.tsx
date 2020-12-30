import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthContext from './contexts/AuthContextDev'

import Main from './screens/Main/Main'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Load from './screens/loading/Load'

const StackNavigator = createStackNavigator()

const Navigator = () => {
    const { loginState } = useContext(AuthContext)

    return (
        <StackNavigator.Navigator>
            {loginState === 'loading' || loginState === 'logged' ? (
                <>
                    <StackNavigator.Screen
                        name="main"
                        component={loginState === 'loading' ? Load : Main}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <StackNavigator.Screen
                        name="profile"
                        component={UserProfile}
                    />
                </>
            ) : (
                <StackNavigator.Screen name="login" component={Login} />
            )}
        </StackNavigator.Navigator>
    )
}

const UserProfile = () => {
    const { userData } = useContext(AuthContext)

    return <Profile userData={userData} />
}

export default Navigator
