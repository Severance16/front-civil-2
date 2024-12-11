import clientAxios from '@/clients/clientAxios';
import { InformationData, informationSchema } from '@/types';
import { isAxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native';

export default function ControlDetail() {

    const { informationId } = useLocalSearchParams<{ informationId: string }>();
    const [information, setInformation] = useState<InformationData>()
    const [assists, setAssists] = useState([])

    const getInformation = async () => {
        if (informationId === null || informationId === undefined) {
            return
        }

        try {
            const { data } = await clientAxios(`/project/information/${informationId}`)
            const respose = informationSchema.safeParse(data)
            if (respose.success) {
                setInformation(respose.data)
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert("Hubo un error.");
            }
        }
    }

    const getAssists = async () => {
        try {
            const { data } = await clientAxios(`/project/information/${informationId}/assist`) 
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert("Hubo un error.");
            }
        }
    }

    useEffect(() => {
        getInformation()
        getAssists()
    }, [informationId])

    if (!information) return <Text>Cargando...</Text>
    
    return (
        <View>
            <Text>
                {information.id}
            </Text>
        </View>
    )
}
