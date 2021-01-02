import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { PostType, UserType, UserAPI, PostAPI } from '../api/xpertSankhyaAPI'
import {
    AntDesign,
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import AuthContext from '../contexts/AuthContextDev'

import PostLoader from './PostLoader'

interface PostPropsType {
    post: PostType
}

function Post({ post }: PostPropsType) {
    const { user } = useContext(AuthContext)

    const navigation = useNavigation()

    const [userIsLoading, setUserIsLoading] = useState<boolean>(true)
    const [creatorData, setCreatorData] = useState<UserType | null>(null)
    let [like, setLike] = useState<Boolean>(false)

    useEffect(() => {
        setUserIsLoading(true)
        setLike(post.likes.some((post) => post.creatorUid === user.uid))
        UserAPI.getOne(post.creatorUid).then((userRespose) => {
            setCreatorData(userRespose.data)
            setUserIsLoading(false)
        })
    }, [post])

    return (
        <View style={styles.post}>
            {userIsLoading ? (
                <PostLoader />
            ) : (
                <View style={styles.postTitle}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                        }}
                        onPress={() =>
                            navigation.navigate('profile', {
                                userUid: user.uid,
                            })
                        }
                    >
                        <Image
                            style={styles.userImage}
                            source={{ uri: creatorData.profilePic.url }}
                        />
                        <View style={styles.userNameView}>
                            <Text style={styles.userNameText}>
                                {creatorData.username}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View>
                <TouchableOpacity
                    style={styles.postImage}
                    onPress={() =>
                        navigation.navigate('imageView', {
                            uris: post.content.payload,
                        })
                    }
                >
                    {post.content.type === 'image' &&
                        post.content.payload.length === 1 && (
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderColor: 'gray',
                                }}
                                source={{ uri: post.content.payload[0] }}
                            />
                        )}
                </TouchableOpacity>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => {
                            like
                                ? PostAPI.dislike(post._id)
                                      .then(() => setLike(false))
                                      .catch((e) => console.log(e))
                                : PostAPI.like(post._id)
                                      .then(() => setLike(true))
                                      .catch((e) => console.log(e))
                        }}
                    >
                        <AntDesign
                            name={like ? 'heart' : 'hearto'}
                            size={24}
                            color={like ? 'red' : 'black'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="message" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="expand" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.postTextView}>
                    <Text style={styles.postText}>{post.description}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    post: {
        height: 'auto',
        marginVertical: 10,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
        // borderRadius: 5,
    },
    postTitle: {
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'grey',
        // borderRadius: 10,
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#c6b9b9',
        marginLeft: '3%',
    },
    userNameView: {
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: '5%',
    },
    userNameText: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    postImage: {
        width: '100%',
        height: 'auto',
        maxHeight: 340,
    },
    buttons: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    postTextView: {
        width: '100%',
        height: 'auto',
        maxHeight: 100,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    postText: {
        fontSize: 15,
        fontFamily: 'sans-serif',
        fontWeight: '500',
        paddingVertical: 15,
        paddingLeft: 6,
        // fontStyle:,
    },
})
export default Post
