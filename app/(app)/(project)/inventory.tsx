import clientAxios from '@/clients/clientAxios'
import FloatButton from '@/components/general/FloatButton'
import ModalGeneral from '@/components/general/ModalGeneral'
import InputCard from '@/components/input/InputCard'
import InputForm from '@/components/input/InputForm'
import InventoryTypeButton from '@/components/inventory/InventoryTypeButton'
import ToolCard from '@/components/tool/ToolCard'
import ToolForm from '@/components/tool/ToolForm'
import useProject from '@/hooks/useProject'
import { InputData, inventoryData, InventoryType, ToolData } from '@/types'
import { isAxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Inventory() {
    const { projectId } = useProject()
    const [type, setType] = useState<InventoryType>("input")
    const [tools, setTools] = useState<ToolData[]>([])
    const [inputs, setInputs] = useState<InputData[]>([])
    const [inventoryId, setInventoryId] = useState<number>(9999999999)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const getInventory = async () => {
        try {
            const { data } = await clientAxios(`/project/${projectId}/inventory-s`)
            const response = inventoryData.safeParse(data)
            if (response.success) {
                setTools(response.data.tools)
                setInputs(response.data.inputs)
                setInventoryId(response.data.id)
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
            }
        }
    }

    const validateItems = () => {
        if (type === "input") {
            return inputs.length > 0
        } else if (type === "tool") {
            return tools.length > 0
        } else {
            return false
        }
    }

    const changeType = (e: InventoryType) => {
        setType(e)
    }

    const changeModalVisible = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        getInventory()
    }, [projectId])

    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Reportes</Text>
            <Text style={styles.textInfo}>Escoge el tipo de reporte que deseas ver!</Text>
            <InventoryTypeButton type={type} action={changeType} />
            <Text style={styles.textInfo}>{validateItems() ? `Acá tienes la lista de ${type === "input" ? "insumos" : "herramientas"}.` : `No hay registros de ${type === "input" ? "insumos" : "herramientas"}.`}</Text>
            <ScrollView>
                <View style={{ flex: 1, gap: 10, }}>
                    {type === 'input' ? (
                        inputs.map(input => <InputCard key={input.id} input={input} />)
                    ) : (
                        tools.map(tool => <ToolCard key={tool.id} tool={tool}/>)
                    )}
                </View>
            </ScrollView>
            <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
                {type === "input" ? (
                    <InputForm changeModalVisible={changeModalVisible} inventoryId={inventoryId} setInputs={setInputs}/>
                ): (
                    <ToolForm changeModalVisible={changeModalVisible} inventoryId={inventoryId} setTools={setTools}/>
                )}
            </ModalGeneral>
            <FloatButton handlePress={changeModalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 10,
        paddingTop: 10,
        flex: 1
    },
    tittle: {
        fontSize: 28,
        fontWeight: "900",
        color: "#EFAD29",
        textAlign: "center"
    },
    textInfo: {
        textAlign: "center",
        color: "#5B5B5E"
    }
})
