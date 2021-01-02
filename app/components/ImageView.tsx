import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageViewer } from 'react-native-image-zoom-viewer'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../Navigator'

type ImageViewRouteType = RouteProp<RootStackParamList, 'imageView'>

interface ImageViewProps {
    route: ImageViewRouteType
}

function ImageView({ route }: ImageViewProps) {
    const { uris } = route.params

    return (
        <View style={styles.container}>
            <ImageViewer
                imageUrls={uris.map((uri) => ({ url: uri }))}
                renderIndicator={() => null}
                style={styles.image}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
    },
})

export default ImageView
