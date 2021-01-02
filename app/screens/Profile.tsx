import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../Navigator'
import PhotoOrMediaOptionsModal from '../components/PhotoOrMediaOptionsModal'
import { UserAPI, UserType } from '../api/xpertSankhyaAPI'
import AuthContext from '../contexts/AuthContextDev'

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

    const { userData: loggedUserData, updateUserData } = useContext(AuthContext)
    const [userData, setUserData] = useState<UserType | undefined>(undefined)
    const [isLoggedUser, setIsloggedUser] = useState<boolean>(false)
    const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)
    const [backgroundOptionsIsOpen, setBackgroundOptionsIsOpen] = useState(
        false
    )

    useEffect(() => {
        if (loggedUserData.uid === userUid) {
            setUserData(loggedUserData)
            setIsloggedUser(true)
        } else {
            UserAPI.getOne(userUid).then((userResponse) => {
                setUserData(userResponse.data)
            })
        }
    }, [userUid, loggedUserData])

    const handleImagePick = async (option: {
        source: 'camera' | 'media'
        destination: 'profile' | 'background'
    }) => {
        let result: ImagePicker.ImagePickerResult
        if (option.source === 'media') {
            const permission = await ImagePicker.getMediaLibraryPermissionsAsync()

            if (!permission.granted) {
                await ImagePicker.requestMediaLibraryPermissionsAsync()
            }

            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: option.destination === 'profile' ? [1, 1] : [2, 1],
                quality: 1,
            })
        } else if (option.source === 'camera') {
            const permission = await ImagePicker.getCameraPermissionsAsync()

            !permission.granted &&
                (await ImagePicker.requestCameraPermissionsAsync())

            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: option.destination === 'profile' ? [1, 1] : [2, 1],
                quality: 1,
            })
        }

        if (result.cancelled === false) {
            const mimeType = result.uri.substring(result.uri.length - 3)
            const formData = new FormData()
            formData.append('file', {
                uri: result.uri,
                name: 'file',
                type: `image/${mimeType}`,
            })
            if (option.destination === 'profile') {
                await UserAPI.uploadProfileImg(userData.uid, formData, {
                    original: false,
                })
            } else if (option.destination === 'background') {
                await UserAPI.uploadBackgroundImg(userData.uid, formData, {
                    original: false,
                })
            }

            setTimeout(async () => setUserData(await updateUserData()), 300)
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
                                    <PhotoOrMediaOptionsModal
                                        isOpen={profileOptionsIsOpen}
                                        onClose={() =>
                                            setProfileOptionsIsOpen(false)
                                        }
                                        onMedia={() =>
                                            handleImagePick({
                                                source: 'media',
                                                destination: 'profile',
                                            })
                                        }
                                        onPhoto={() =>
                                            handleImagePick({
                                                source: 'camera',
                                                destination: 'profile',
                                            })
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                setProfileOptionsIsOpen(true)
                                            }
                                        >
                                            <MaterialIcons
                                                name="add-a-photo"
                                                size={24}
                                                color="rgb(207, 185, 185)"
                                            />
                                        </TouchableOpacity>
                                    </PhotoOrMediaOptionsModal>
                                </View>
                            )}
                        </View>
                        {isLoggedUser && (
                            <View style={styles.addBackgroundImageBtn}>
                                <PhotoOrMediaOptionsModal
                                    isOpen={backgroundOptionsIsOpen}
                                    onClose={() =>
                                        setBackgroundOptionsIsOpen(false)
                                    }
                                    onMedia={() =>
                                        handleImagePick({
                                            source: 'media',
                                            destination: 'background',
                                        })
                                    }
                                    onPhoto={() =>
                                        handleImagePick({
                                            source: 'camera',
                                            destination: 'background',
                                        })
                                    }
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            setBackgroundOptionsIsOpen(true)
                                        }
                                    >
                                        <MaterialIcons
                                            name="add-photo-alternate"
                                            size={40}
                                            color="rgb(207, 185, 185)"
                                        />
                                    </TouchableOpacity>
                                </PhotoOrMediaOptionsModal>
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
