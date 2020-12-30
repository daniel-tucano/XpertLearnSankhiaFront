import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { UserAPI, UserType } from '../api/xpertSankhyaAPI'
interface ProfilePropsType {
    userUid?: string
    userData?: UserType
}

const Profile = ({ userUid, userData: userProvidedData }: ProfilePropsType) => {
    const [userData, setUserData] = useState<UserType>({} as UserType)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        UserAPI.getOne(userUid).then((userResponse) => {
            setUserData(userResponse.data)
            setIsLoading(false)
        })
    }, [userUid])

    return (
        <View>
            {userProvidedData ? (
                <Text>{userProvidedData.username}</Text>
            ) : (
                <>
                    {isLoading ? (
                        <Text>Loading</Text>
                    ) : (
                        <Text>{userData.name}</Text>
                    )}
                </>
            )}
        </View>
    )
}

export default Profile
