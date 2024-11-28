import clientAxios from '@/clients/clientAxios'
import { useGlobalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

export default function BudgetDashboard() {
    const { type, budgetId } = useGlobalSearchParams<{ type: string, budgetId: string }>()
    const [items, setItems] = useState([])

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

    useEffect(() => {
        getItemsBudget()
    }, [budgetId])

    return (
        <View>
            {items.length > 0 ? (
                <Text>Acá tienes la lista de actividades.</Text>
            ) : (
                <Text>No tienes actividades definidas aún.</Text>
            )}
        </View>
    )
}
