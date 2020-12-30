import React, { useState, useEffect, createContext } from 'react'
import * as WebBrowser from 'expo-web-browser'
// import { ResponseType } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import firebase from '../firebase/fireApp'
import { UserAPI, UserType, setAuthToken } from '../api/xpertSankhyaAPI'

interface AuthContextType {
    signInAsync: (
        providerOption: 'google' | 'custom',
        additionalData?: { email: string; password: string }
    ) => Promise<void>
    signOutAsync: () => Promise<void>
    loginState: 'notLogged' | 'loading' | 'logged'
    updateUserData: () => Promise<void>
    user: firebase.User | undefined
    userData: UserType | undefined
}

WebBrowser.maybeCompleteAuthSession()

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [loginState, setLoginState] = useState<
        'notLogged' | 'loading' | 'logged'
    >('notLogged')
    const [user, setUser] = useState<firebase.User | undefined>(undefined)
    const [userData, setUserData] = useState<UserType | undefined>(undefined)

    const [_request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '438802009130-dgoqfc2emkie1474mu7sso1ie9k96it6.apps.googleusercontent.com',
    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params

            const credential = firebase.auth.GoogleAuthProvider.credential(
                id_token
            )
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((userCredential) => {
                    _handleSignInAsync(userCredential.user)
                })
        } else {
            setLoginState('notLogged')
        }
    }, [response])

    const signInAsync = async (
        providerOption: 'google' | 'custom',
        additionalData?: { email: string; password: string }
    ) => {
        setLoginState('loading')
        // Baseado no valor de providerOption escolhe o provider adequado
        switch (providerOption) {
            case 'google':
                await promptAsync()
                break
            // case 'facebook':
            //     firebase.auth().signInWithRedirect(facebookProvider)
            //     break
            case 'custom':
                if (additionalData) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(
                            additionalData.email,
                            additionalData.password
                        )
                        .then((result) => {
                            if (result.user) {
                                setUser(result.user)
                                setLoginState('logged')
                            } else {
                                setUser(undefined)
                                setLoginState('notLogged')
                            }
                        })
                        .catch((error) => {
                            console.log(error.message)
                            setUser(undefined)
                            setLoginState('notLogged')
                        })
                } else {
                    console.log('please specify an email and a password')
                }
                break
            default:
                console.log('selecione um provedor de autenticação')
        }
    }

    const signOutAsync = async () => {
        await firebase.auth().signOut()
        setUser(undefined)
        setLoginState('notLogged')
        console.log('user sign out')
    }

    // Atualiza os dados do usuario atual quando invocado
    const updateUserData = async () => {
        if (!user) return
        const usuarioDB = await UserAPI.getOne(user.uid)
        setUserData(usuarioDB.data)
    }

    const _handleSignInAsync = async (user: firebase.User) => {
        if (!user) return
        setLoginState('logged')
        setUser(user)
        const authToken = await user.getIdToken()
        setAuthToken(authToken)
        const usuarioDB = await UserAPI.getOne(user.uid)
        setUserData(usuarioDB.data)
    }

    return (
        <AuthContext.Provider
            value={{
                signInAsync,
                signOutAsync,
                updateUserData,
                loginState,
                user,
                userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
