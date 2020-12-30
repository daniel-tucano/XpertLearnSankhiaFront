import React from 'react';
import { View,StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer'
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

function PostImageView(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons 
                style={styles.button} 
                name="arrow-back-circle-outline" 
                size={50} 
                color="white" />
            </TouchableOpacity>
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
    },button:{
        justifyContent:'flex-start'
    }
})

export default PostImageView;