import React, { useState, useEffect, createContext } from 'react'
import * as GoogleSignIn from 'expo-google-sign-in'
import { setAuthToken, UserAPI, UserType } from '../api/xpertSankhyaAPI'

interface AuthContextType {
    signInAsync: (
        providerOption: string,
        additionalData?: { email: string; password: string }
    ) => Promise<void>
    signOutAsync: () => Promise<void>
    isLogged: boolean
    updateUserData: () => Promise<void>
    user: GoogleSignIn.GoogleUser | undefined
    userData: UserType | undefined
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isLogged, setLogged] = useState(false)
    const [user, setUser] = useState<GoogleSignIn.GoogleUser | undefined>(
        undefined
    )
    const [userData, setUserData] = useState<UserType | undefined>(undefined)

    useEffect(() => {
        GoogleSignIn.initAsync()
        GoogleSignIn.signInSilentlyAsync()
            .then((user) => {
                _handleSignInAsync(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const signInAsync = async (
        providerOption: string,
        additionalData?: { email: string; password: string }
    ) => {
        // Baseado no valor de providerOption escolhe o provider adequado
        switch (providerOption) {
            case 'google':
                await GoogleSignIn.askForPlayServicesAsync()
                const { type, user } = await GoogleSignIn.signInAsync()
                if (type === 'success') {
                    _handleSignInAsync(user)
                }
                break
            // case 'facebook':
            //     fireApp.auth().signInWithRedirect(facebookProvider)
            //     break
            // case 'custom':
            // if (additionalData) {
            //     fireApp
            //         .auth()
            //         .signInWithEmailAndPassword(
            //             additionalData.email,
            //             additionalData.password
            //         )
            //         .then((result) => {
            //             if (result.user) {
            //                 console.log(result)
            //                 setUser(result.user)
            //                 setLogged(true)
            //             } else {
            //                 setUser(undefined)
            //                 setLogged(false)
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error.message)
            //             setUser(undefined)
            //             setLogged(false)
            //         })
            // } else {
            //     console.log('please specify an email and a password')
            // }
            // break
            default:
                console.log('selecione um provedor de autenticação')
        }
    }

    const signOutAsync = async () => {
        await GoogleSignIn.signInAsync()
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

    const _handleSignInAsync = async (user: GoogleSignIn.GoogleUser) => {
        if (!user) return
        setLogged(true)
        setUser(user)
        const authToken = user.auth.accessToken
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
                isLogged,
                user,
                userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
