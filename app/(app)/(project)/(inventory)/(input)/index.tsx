import clientAxios from '@/clients/clientAxios'
import { InputData, inputSchema } from '@/types'
import { isAxiosError } from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'

export default function Input() {
  const {inputId} = useLocalSearchParams<{ inputId: string }>()
  const [input, setInput] = useState<InputData>()

  const getInput = async () => {
    if (inputId === undefined || inputId === "" || inputId === null) {
      return
    }

    try {
      const { data } = await clientAxios(`/project/input/${inputId}`)

      const response = inputSchema.safeParse(data)
      if (response.success) {
        setInput(response.data)
      }else{
        Alert.alert("Algo sucedio.")
      }

    } catch (error) {
      console.log(error)
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    getInput()
  }, [inputId])

  return (
    <Text>
      {input?.description}
    </Text>
  )
}
