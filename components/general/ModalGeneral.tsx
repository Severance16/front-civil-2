import React, { ReactNode } from 'react'
import { Modal } from 'react-native';

interface ProjectModalProps {
    modalVisible: boolean,
    changeModalVisible: () => void
    children: ReactNode,
}

export default function ModalGeneral({ modalVisible, changeModalVisible, children }: ProjectModalProps) {
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
