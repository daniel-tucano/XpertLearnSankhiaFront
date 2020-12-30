import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 -10 355 700"
        backgroundColor="#897c7c"
        foregroundColor="#f0ebeb"
        {...props}
    >
        <Circle cx="28" cy="155" r="20" />
        <Rect x="58" y="148" rx="7" ry="7" width="110" height="15" />
        <Rect x="0" y="184" rx="0" ry="0" width="355" height="246" />
        <Rect x="11" y="445" rx="5" ry="5" width="25" height="25" />
        <Rect x="53" y="445" rx="5" ry="5" width="25" height="25" />
        <Rect x="98" y="445" rx="5" ry="5" width="25" height="25" />
        <Rect x="138" y="452" rx="6" ry="6" width="75" height="12" />
        <Rect x="304" y="445" rx="5" ry="5" width="25" height="25" />
        {/* <Circle cx="28" cy="515" r="20" />
        <Rect x="58" y="508" rx="7" ry="7" width="110" height="15" />
        <Rect x="0" y="544" rx="0" ry="0" width="355" height="246" />
        <Rect x="11" y="805" rx="5" ry="5" width="25" height="25" />
        <Rect x="53" y="805" rx="5" ry="5" width="25" height="25" />
        <Rect x="98" y="805" rx="5" ry="5" width="25" height="25" />
        <Rect x="138" y="802" rx="6" ry="6" width="75" height="12" />
        <Rect x="304" y="805" rx="5" ry="5" width="25" height="25" /> */}
    </ContentLoader>
)

export default MyLoader
