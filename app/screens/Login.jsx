import React, { useRef, useContext } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import AuthContext from '../contexts/AuthContextDev'

function Login() {
    const { signInAsync } = useContext(AuthContext)
    const userLoginData = useRef({ email: '', password: '' })

    return (
        <View style={styles.container}>
            <View style={styles.login}>
                <Image style={styles.logo} />
            </View>
            <View style={styles.login}>
                <Ionicons name="person" size={24} color="#026B2E" />
                <TextInput
                    style={styles.textInput}
                    textContentType="emailAddress"
                    editable
                    placeholder="Email"
                    onChangeText={(e) => {
                        userLoginData.current.email = e
                    }}
                />
            </View>
            <View style={styles.login}>
                <Fontisto name="locked" size={24} color="#026B2E" />
                <TextInput
                    style={styles.textInput}
                    textContentType="password"
                    editable
                    secureTextEntry
                    placeholderTextColor="grey"
                    placeholder="Senha"
                    onChangeText={(e) => {
                        userLoginData.current.password = e
                    }}
                />
            </View>
            <View style={styles.login}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                        signInAsync('custom', userLoginData.current)
                    }}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E3E3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        height: 38,
        width: '70%',
        position: 'relative',
        bottom: 50,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: 50,
        width: '70%',
        position: 'relative',
        bottom: 50,
        margin: 10,
        borderRadius: 10,
    },
    textInput: {
        marginLeft: 8,
        width: '90%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#026B2E',
        borderBottomEndRadius: 50,
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: '#026B2E',
        width: 200,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 3,
        elevation: 8,
        shadowRadius: 15,
        shadowOffset: { width: 56, height: 13 },
    },
    loginButtonText: {
        color: 'white',
    },
    logo: {
        height: 80,
        width: 80,
    },
    loading: {
        flex: 1,
    },
})

export default Login
