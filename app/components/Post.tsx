import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { PostType, UserType, UserAPI } from '../api/xpertSankhyaAPI'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import PostLoader from './PostLoader'

interface PostPropsType {
    post: PostType
}
interface PostLikes{
    like:Boolean
}
function Post({ post }: PostPropsType) {
    const [userIsLoading, setUserIsLoading] = useState<boolean>(true)
    const [creatorData, setCreatorData] = useState<UserType | null>(null)
    let [like,setLike] = useState<Boolean>(false)

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
            <View>
                <TouchableOpacity style={styles.postImage}>
                    {post.content.type === 'image' && (
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            source={{ uri: post.content.payload }}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.postTextView}>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={()=>setLike(like = !like)}>
                            <AntDesign name={like?"heart":"hearto"} size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="message" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="expand" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.postText}>
                            Texto inserido aqui lorem ipsum dolor amet lorem ipsum
                    </Text>
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
        height: 540,
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
    postImage: { 
        width: '100%',
        height: 'auto', 
        maxHeight: 340 
    },
    buttons:{
        width:'100%',
        height:30,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
        
    },
    postTextView:{
        width:'100%',
        height:"auto",
        maxHeight:100,
        alignItems:"center",
        justifyContent:"center"
    },
    postText:{
        fontSize: 15,
        fontFamily: 'sans-serif',
        fontWeight: '500',
        textAlign: 'left',
        padding:15
    }
})
export default Post
