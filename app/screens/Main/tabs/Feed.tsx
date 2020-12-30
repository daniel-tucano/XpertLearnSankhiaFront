import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { PostAPI, PostType } from '../../../api/xpertSankhyaAPI'
import Post from '../../../components/Post'

function Feed() {
    const [posts, setPosts] = useState<PostType[]>([] as PostType[])

    useEffect(() => {
        PostAPI.getPage().then((postsPageResponse) => {
            setPosts(postsPageResponse.data.docs)
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            {posts.length > 0 && posts.map((post) => <Post post={post} />)}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default Feed
