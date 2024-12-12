import clientAxios from '@/clients/clientAxios'
import FloatButton from '@/components/general/FloatButton'
import ModalGeneral from '@/components/general/ModalGeneral'
import InformationCard from '@/components/information/InformationCard'
import InformationForm from '@/components/information/InformationForm'
import useProject from '@/hooks/useProject'
import { informationDashboardSchema, InformationData } from '@/types'
import { isAxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Control() {

  const { projectId } = useProject()

  const [informations, setInformations] = useState<InformationData[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  const getAllInformation = async () => {
    try {
      const { data } = await clientAxios(`project/${projectId}/information`)
      const reponse = informationDashboardSchema.safeParse(data)
      if (reponse.success) {
        setInformations(reponse.data)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    getAllInformation()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Control</Text>
      <Text style={styles.textInfo}>{informations.length > 0 ? `Acá tienes la lista de los controles.` : `No hay registros de control.`}</Text>
      <ScrollView>
        <View style={{ flex: 1, gap: 10, }}>
          {informations.length > 0 && (
            informations.map(information => <InformationCard key={information.id} information={information} />)
          )}
        </View>
      </ScrollView>
      <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
        <InformationForm changeModalVisible={changeModalVisible} projectId={projectId !== null ? projectId : 99999} setInformations={setInformations} />
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