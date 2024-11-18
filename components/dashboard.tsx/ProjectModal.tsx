import React, { ReactNode } from 'react'
import { Alert, Modal} from 'react-native'

interface ProjectModalProps {
    modalVisible: boolean,
    children: ReactNode
}

export default function ProjectModal({ modalVisible, children }: ProjectModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            {children}
        </Modal>
    )
}

