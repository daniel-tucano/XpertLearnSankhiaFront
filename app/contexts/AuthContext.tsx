import React, { useState, useEffect, createContext } from 'react'
import { setAuthToken, UserAPI, UserType } from '../api/xpertSankhyaAPI'
import firebase from 'firebase'
import fireApp from '../firebase/fireApp'

const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/cloud-platform')

interface AuthContextType {
    signIn: (
        providerOption: string,
        additionalData?: { email: string; password: string }
    ) => void
    signOut: () => void
    isLogged: boolean
    updateUserData: () => Promise<void>
    user: firebase.User | undefined
    userData: UserType | undefined
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isLogged, setLogged] = useState(false)
    const [user, setUser] = useState<firebase.User | undefined>(undefined)
    const [userData, setUserData] = useState<UserType | undefined>(undefined)

    useEffect(() => {
        fireApp.auth().onIdTokenChanged(async (usuario) => {
            if (usuario) {
                // console.log(usuario)
                const authToken = await usuario.getIdToken()
                setAuthToken(authToken)
                const usuarioDB = await UserAPI.getOne(usuario.uid)
                setUserData(usuarioDB.data)
                setUser(usuario)
                setLogged(true)
            }
        })

        fireApp
            .auth()
            .getRedirectResult()
            .then(async (result) => {
                if (result.user) {
                    // console.log(result)
                    const authToken = await result.user.getIdToken()
                    setAuthToken(authToken)
                    const usuarioDB = await UserAPI.getOne(result.user.uid)
                    setUserData(usuarioDB.data)
                    setUser(result.user)
                    setLogged(true)
                }
            })
            .catch((error) => {
                console.log(error.message)
                setUser(undefined)
                setLogged(false)
            })
    }, [])

    const signIn = (
        providerOption: string,
        additionalData?: { email: string; password: string }
    ) => {
        // Baseado no valor de providerOption escolhe o provider adequado
        switch (providerOption) {
            case 'google':
                fireApp.auth().signInWithRedirect(googleProvider)
                break
            // case 'facebook':
            //     fireApp.auth().signInWithRedirect(facebookProvider)
            //     break
            case 'custom':
                if (additionalData) {
                    fireApp
                        .auth()
                        .signInWithEmailAndPassword(
                            additionalData.email,
                            additionalData.password
                        )
                        .then((result) => {
                            if (result.user) {
                                console.log(result)
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

    const signOut = () => {
        fireApp
            .auth()
            .signOut()
            .then(() => {
                setUser(undefined)
                setLogged(false)
                console.log('user sign out')
            })
            .catch((error) => {
                console.log('an error ocurred on user sign out process')
                console.log(error.message)
            })
    }

    // Atualiza os dados do usuario atual quando invocado
    const updateUserData = async () => {
        if (!user) return
        const usuarioDB = await UserAPI.getOne(user.uid)
        setUserData(usuarioDB.data)
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
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
