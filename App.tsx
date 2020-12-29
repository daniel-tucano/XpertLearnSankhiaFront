import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContextProvider } from './app/contexts/AuthContextDev'

import Navigator from './app/Navigator'

export default function App() {
    return (
        <NavigationContainer>
            <AuthContextProvider>
                <Navigator />
            </AuthContextProvider>
        </NavigationContainer>
    )
}
