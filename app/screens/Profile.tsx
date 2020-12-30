import React, { useState, useEffect, useContext } from 'react'
import { Text } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../Navigator'
import { UserAPI, UserType } from '../api/xpertSankhyaAPI'
import AuthContext from '../contexts/AuthContextDev'

type ProfileRoutePropType = RouteProp<RootStackParamList, 'profile'>

interface ProfilePropsType {
    route: ProfileRoutePropType
}

const Profile = ({ route }: ProfilePropsType) => {
    const { userUid } = route.params

    const { userData: loggedUserData } = useContext(AuthContext)
    const [userData, setUserData] = useState<UserType>({} as UserType)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (loggedUserData.uid === userUid) {
            setUserData(loggedUserData)
        } else {
            setIsLoading(true)
            UserAPI.getOne(userUid).then((userResponse) => {
                setUserData(userResponse.data)
                setIsLoading(false)
            })
        }
    }, [userUid])

    return (
        <SafeAreaView>
            {isLoading ? <Text>Loading</Text> : <Text>{userData.name}</Text>}
        </SafeAreaView>
    )
}

export default Profile
