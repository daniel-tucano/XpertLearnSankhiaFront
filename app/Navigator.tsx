import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthContext from './contexts/AuthContextDev'

import Main from './screens/Main/Main'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Load from './screens/loading/Load'
import PostImageView from './components/PostImageView'

export type RootStackParamList = {
    profile: { userUid: string }
    main: undefined
    login: undefined
    postImageView: { uris: string[] }
}

const StackNavigator = createStackNavigator<RootStackParamList>()

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
                    <StackNavigator.Screen name="profile" component={Profile} />
                    <StackNavigator.Screen
                        name="postImageView"
                        component={PostImageView}
                    />
                </>
            ) : (
                <StackNavigator.Screen name="login" component={Login} />
            )}
        </StackNavigator.Navigator>
    )
}

export default Navigator
