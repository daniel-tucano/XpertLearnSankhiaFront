import React, { useRef, useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Menu, { MenuItem } from 'react-native-material-menu'

import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../contexts/AuthContextDev'

const TopBar = () => {
    const menuRef = useRef<Menu | null>(null)
    const { signOutAsync } = useContext(AuthContext)

    const navitagion = useNavigation()

    return (
        <SafeAreaView style={styles.topBarWrapper}>
            {/** Colocar Icone Aqui! */}
            <Text>{`Ola COLOCAR O NOME AQUI`}</Text>
            <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => navitagion.navigate('profile')}
            >
                <MaterialIcons name="portrait" size={27} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <Ionicons name="search-sharp" size={27} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => menuRef.current.show()}
            >
                <Entypo name="dots-three-vertical" size={27} color="white" />
            </TouchableOpacity>
            <Menu
                ref={(ref) => {
                    menuRef.current = ref
                }}
            >
                <MenuItem onPress={() => signOutAsync()}>Sign Out</MenuItem>
            </Menu>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 85,
    },
})

export default TopBar
