import clientAxios from '@/clients/clientAxios'
import BudgetForm from '@/components/budget/BudgetForm'
import FloatButton from '@/components/general/FloatButton'
import ModalGeneral from '@/components/general/ModalGeneral'
import { useGlobalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function BudgetDashboard() {
    const { type, budgetId } = useGlobalSearchParams<{ type: string, budgetId: string }>()
    const [items, setItems] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    console.log(`tipo: ${type}; budgetId: ${budgetId}`)

    const getItemsBudget = async () => {
        console.log(budgetId !== "null")
        if (budgetId !== null) {
            try {
                const { data } = await clientAxios.get(`/project/budget/${budgetId}/item`)
                console.log("carga:", data)

            } catch (error) {
                // console.log(error.message)
            }
        }
    }

    const handlePress = () => {
        console.log("Modal crear item")
    }

    const changeModalVisible = () => {
        setModalVisible(!modalVisible)
    }
    useEffect(() => {
        getItemsBudget()
    }, [budgetId])


    return (
        <View style={{ flex: 1 }}>
            {items.length > 0 ? (
                <Text>Acá tienes la lista de actividades.</Text>
            ) : (
                <Text>No tienes actividades definidas aún.</Text>
            )}
            <ScrollView>
                <View style={{ flex: 1, gap: 10 }}>


                </View>
            </ScrollView>
            <ModalGeneral modalVisible={modalVisible} changeModalVisible={changeModalVisible}>
                <BudgetForm changeModalVisible={changeModalVisible}/>
            </ModalGeneral>
            <FloatButton handlePress={changeModalVisible} />
        </View>
    )
}
