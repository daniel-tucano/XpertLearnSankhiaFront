import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContextProvider } from './app/contexts/AuthContextDev'

import Navigator from './app/Navigator'

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <AuthContextProvider>
                    <Navigator />
                </AuthContextProvider>
            </NavigationContainer>
        </PaperProvider>
    )
}
