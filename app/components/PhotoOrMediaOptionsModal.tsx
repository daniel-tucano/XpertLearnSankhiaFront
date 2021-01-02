import React from 'react'
import { Menu } from 'react-native-paper'

interface PhotoOrMediaOptionsModalProps {
    isOpen: boolean
    onClose: () => void
    onPhoto: () => void
    onMedia: () => void
    children: React.ReactNode
}

const PhotoOrMediaOptionsModal = ({
    isOpen,
    onClose,
    onPhoto,
    onMedia,
    children,
}: PhotoOrMediaOptionsModalProps) => {
    return (
        <Menu visible={isOpen} anchor={children} onDismiss={onClose}>
            <Menu.Item onPress={onPhoto} title="photo"></Menu.Item>
            <Menu.Item onPress={onMedia} title="media"></Menu.Item>
        </Menu>
    )
}

export default PhotoOrMediaOptionsModal
