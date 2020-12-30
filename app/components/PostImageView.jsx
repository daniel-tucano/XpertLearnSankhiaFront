import React from 'react';
import { View,StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer'

function PostImageView(props) {
    return (
        <View style={styles.container}>
            <ImageViewer imageUrls={props.images} renderIndicator={()=>null} style={styles.image}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    image:{
        flex:1
    }
})

export default PostImageView;