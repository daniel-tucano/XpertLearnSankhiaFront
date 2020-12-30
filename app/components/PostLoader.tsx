import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const PostLoader = (props) => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 360 300"
        backgroundColor="#897c7c"
        foregroundColor="#f0ebeb"
        {...props}
    >
        <Circle cx="28" cy="28" r="20" />
        <Rect x="58" y="21" rx="7" ry="7" width="110" height="15" />
        <Rect x="0" y="57" rx="0" ry="0" width="355" height="246" />
        <Rect x="11" y="318" rx="5" ry="5" width="25" height="25" />
        <Rect x="53" y="318" rx="5" ry="5" width="25" height="25" />
        <Rect x="98" y="318" rx="5" ry="5" width="25" height="25" />
        <Rect x="138" y="325" rx="6" ry="6" width="75" height="12" />
        <Rect x="304" y="318" rx="5" ry="5" width="25" height="25" />
    </ContentLoader>
)

export default PostLoader
