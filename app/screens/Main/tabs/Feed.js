import React from 'react'
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import FeedCard from '../../../components/FeedCard'

function Feed(props) {
    return (
        <ScrollView style={styles.container}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default Feed
