import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

function FeedCard(props) {
    return (
            <View style={styles.post}>
                <View style={styles.postTitle}>
                    <View style={styles.userImageView}>
                        <Image
                            style={styles.userImage}
                            source={require('../assets/avatar.jpg')}
                        />
                    </View>
                    <View style={styles.userNameView}>
                        <Text style={styles.userNameText}>
                            Avatar a lenda de Aang
                        </Text>
                    </View>
                </View>
            </View>
    );
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userImageView: {
        height: 45,
        width: 45,
        backgroundColor: 'black',
        borderRadius: 100,
        position: 'relative',
        left: 30,
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    userNameView: {
        width: '75%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    userNameText: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'left',
    },
})
export default FeedCard;