import React, { useRef, useContext } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Menu, { MenuItem } from 'react-native-material-menu'

import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../contexts/AuthContextDev'

const TopBar = () => {
    const menuRef = useRef<Menu | null>(null)
    const { userData, signOutAsync } = useContext(AuthContext)

    const navitagion = useNavigation()

    return (
        <>
            <SafeAreaView style={styles.topBarWrapper}>
                {/** Colocar Icone Aqui! */}
                <Text>{`Ola ${userData ? userData.name : ''}`}</Text>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() =>
                            userData &&
                            navitagion.navigate('profile', {
                                userUid: userData.uid,
                            })
                        }
                    >
                        <MaterialIcons
                            name="portrait"
                            size={27}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <Ionicons name="search-sharp" size={27} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => menuRef.current.show()}
                    >
                        <Entypo
                            name="dots-three-vertical"
                            size={27}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Menu
                        ref={(ref) => {
                            menuRef.current = ref
                        }}
                        style={{
                            width: '45%',
                            position: 'absolute',
                            top: 10,
                            right: 0,
                        }}
                    >
                        <MenuItem onPress={() => signOutAsync()}>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    topBarWrapper: {
        position: 'relative',
        height: 85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsWrapper: {
        height: '100%',
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default TopBar
