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
    isLogged: boolean
    updateUserData: () => Promise<void>
    user: firebase.User | undefined
    userData: UserType | undefined
    loading: Boolean
    setLoading: any
    isLoading: any
}

WebBrowser.maybeCompleteAuthSession()

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isLogged, setLogged] = useState(false)
    const [user, setUser] = useState<firebase.User | undefined>(undefined)
    const [userData, setUserData] = useState<UserType | undefined>(undefined)
    let [loading, setLoading] = useState<Boolean>(false);

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
        }
    }, [response])

    const signInAsync = async (
        providerOption: 'google' | 'custom',
        additionalData?: { email: string; password: string }
    ) => {
        // Baseado no valor de providerOption escolhe o provider adequado
        switch (providerOption) {
            case 'google':
                promptAsync()
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
                                setLogged(true)
                            } else {
                                setUser(undefined)
                                setLogged(false)
                            }
                        })
                        .catch((error) => {
                            console.log(error.message)
                            setUser(undefined)
                            setLogged(false)
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
        setLogged(false)
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
        setLogged(true)
        setUser(user)
        const authToken = await user.getIdToken()
        setAuthToken(authToken)
        const usuarioDB = await UserAPI.getOne(user.uid)
        setUserData(usuarioDB.data)
    }
    const isLoading = (state:boolean)=>{
        setLoading(loading = state);
        console.log(loading);
    }

    return (
        <AuthContext.Provider
            value={{
                signInAsync,
                signOutAsync,
                updateUserData,
                isLogged,
                user,
                userData,
                loading,
                setLoading,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
