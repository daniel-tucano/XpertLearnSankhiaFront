import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const MyLoader = (props) => (
    <ContentLoader
        speed={3}
        width={'100%'}
        height={'100%'}
        viewBox="0 -10 355 700"
        backgroundColor="#897c7c"
        foregroundColor="#f0ebeb"
        {...props}
    >
        <Rect x="11" y="40" rx="3" ry="3" width="28" height="28" />
        <Rect x="49" y="44" rx="10" ry="10" width="160" height="20" />
        <Rect x="225" y="40" rx="3" ry="3" width="25" height="25" />
        <Rect x="268" y="40" rx="3" ry="3" width="25" height="25" />
        <Rect x="313" y="40" rx="3" ry="3" width="25" height="25" />
        <Rect x="18" y="95" rx="8" ry="8" width="39" height="15" />
        <Rect x="82" y="95" rx="8" ry="8" width="82" height="15" />
        <Rect x="193" y="95" rx="8" ry="8" width="59" height="15" />
        <Rect x="288" y="95" rx="8" ry="8" width="39" height="15" />
        <Circle cx="297" cy="608" r="28" />
    </ContentLoader>
)

export default MyLoader
