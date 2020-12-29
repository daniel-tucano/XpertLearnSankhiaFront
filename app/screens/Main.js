import React from 'react'
import { View } from 'react-native'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

function Main(props) {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Sankhya Expert</Text>
            </View>
            <ScrollView>
                <TouchableHighlight>
                    <Text>Feed</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                    <Text>Treinamento</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                    <Text>Mecado</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                    <Text>S-Live</Text>
                </TouchableHighlight>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        backgroundColor: '#026B2E',
        flex: 0.13,
    },
    topBarText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Inter_900Black',
    },
})

export default Main
