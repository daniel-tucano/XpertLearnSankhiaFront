import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { PostType, UserType, UserAPI } from '../api/xpertSankhyaAPI'

import PostLoader from './PostLoader'

interface PostPropsType {
    post: PostType
}

function Post({ post }: PostPropsType) {
    const [userIsLoading, setUserIsLoading] = useState<boolean>(true)
    const [creatorData, setCreatorData] = useState<UserType | null>(null)

    useEffect(() => {
        setUserIsLoading(true)
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
                    <View style={styles.userImageView}>
                        <Image
                            style={styles.userImage}
                            source={{ uri: creatorData.profilePic.url }}
                        />
                    </View>
                    <View style={styles.userNameView}>
                        <Text style={styles.userNameText}>
                            {creatorData.username}
                        </Text>
                    </View>
                </View>
            )}
            <View style={styles.postContent}>
                {post.content.type === 'image' && (
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: post.content.payload }}
                    />
                )}
            </View>
            <View></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    post: {
        height: 400,
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 5,
    },
    postTitle: {
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userImageView: {
        height: 45,
        width: 45,
        backgroundColor: 'black',
        borderRadius: 100,
        marginLeft: '5%',
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 100,
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
    postContent: { width: '100%', height: 'auto', maxHeight: 340 },
})
export default Post
