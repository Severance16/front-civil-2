import React, { ReactNode } from 'react'
import { Alert, Modal} from 'react-native'

interface ProjectModalProps {
    modalVisible: boolean,
    changeModalVisible: () => void
    children: ReactNode,
}

export default function ProjectModal({ modalVisible, changeModalVisible, children }: ProjectModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                changeModalVisible();
            }}
        >
            {children}
        </Modal>
    )
}

