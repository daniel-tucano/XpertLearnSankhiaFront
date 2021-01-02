import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../Navigator'
import { UserAPI, UserType } from '../api/xpertSankhyaAPI'
import AuthContext from '../contexts/AuthContextDev'
import { requestAsync } from 'expo-auth-session/build/Fetch'

type ProfileNavigationPropType = StackNavigationProp<
    RootStackParamList,
    'profile'
>

type ProfileRoutePropType = RouteProp<RootStackParamList, 'profile'>

interface ProfilePropsType {
    navigation: ProfileNavigationPropType
    route: ProfileRoutePropType
}

const Profile = ({ navigation, route }: ProfilePropsType) => {
    const { userUid } = route.params

    const { userData: loggedUserData } = useContext(AuthContext)
    const [userData, setUserData] = useState<UserType | undefined>(undefined)
    const [isLoggedUser, setIsloggedUser] = useState<boolean>(false)

    useEffect(() => {
        if (loggedUserData.uid === userUid) {
            setUserData(loggedUserData)
            setIsloggedUser(true)
        } else {
            UserAPI.getOne(userUid).then((userResponse) => {
                setUserData(userResponse.data)
            })
        }
    }, [userUid])

    const handleProfileImagePick = async () => {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync()

        if (!permission.granted) {
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            const formData = new FormData()
            formData.append('file', {
                uri: result.uri,
                name: 'profile-pic',
                type: result.type,
            })
            UserAPI.uploadProfileImg(userData.uid, formData, {
                original: false,
            })
                .then((response) => console.log(response))
                .catch((e) => console.log(e))
        }
    }

    const handleBackgroundImagePick = async () => {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync()

        if (!permission.granted) {
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            const formData = new FormData()
            formData.append('file', {
                uri: result.uri,
                // name: 'file',
                // type: result.type,
            })
            UserAPI.uploadProfileImg(userData.uid, formData, {
                original: false,
            })
                .then((response) => console.log(response))
                .catch((e) => console.log(e))
        }
    }

    return (
        <SafeAreaView>
            {userData === undefined ? (
                <Text>Loading</Text>
            ) : (
                <View style={styles.backgroundImg}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('imageView', {
                                uris: [userData.backgroundImg.url],
                            })
                        }
                    >
                        <Image
                            source={{ uri: userData.backgroundImg.url }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={styles.profilePic}>
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: profilePicRadius / 2,
                                }}
                                onPress={() =>
                                    navigation.navigate('imageView', {
                                        uris: [userData.profilePic.url],
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: userData.profilePic.url }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: profilePicRadius / 2,
                                    }}
                                />
                            </TouchableOpacity>
                            {isLoggedUser && (
                                <View
                                    style={{
                                        ...styles.addBackgroundImageBtn,
                                        position: 'absolute',
                                        height: 45,
                                        width: 45,
                                        bottom: -30,
                                        right: -5,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={handleProfileImagePick}
                                    >
                                        <MaterialIcons
                                            name="add-a-photo"
                                            size={24}
                                            color="rgb(207, 185, 185)"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        {isLoggedUser && (
                            <View style={styles.addBackgroundImageBtn}>
                                <TouchableOpacity
                                    onPress={handleBackgroundImagePick}
                                >
                                    <MaterialIcons
                                        name="add-photo-alternate"
                                        size={40}
                                        color="rgb(207, 185, 185)"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

const profilePicRadius = 120
const addBackgroundImageBtnRadius = 53

const styles = StyleSheet.create({
    backgroundImg: {
        width: '100%',
        height: '55%',
        maxHeight: 200,
    },
    addBackgroundImageBtn: {
        width: addBackgroundImageBtnRadius,
        height: addBackgroundImageBtnRadius,
        position: 'absolute',
        right: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -addBackgroundImageBtnRadius / 2 }],
        borderRadius: addBackgroundImageBtnRadius / 2,
        borderColor: 'rgb(207, 185, 185)',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    profilePic: {
        width: profilePicRadius,
        height: profilePicRadius,
        position: 'absolute',
        left: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -profilePicRadius / 2 }],
        borderRadius: profilePicRadius,
        borderColor: 'rgb(207, 185, 185)',
        borderWidth: 3,
        // overflow: 'hidden',
        backgroundColor: 'gray',
    },
})

export default Profile
