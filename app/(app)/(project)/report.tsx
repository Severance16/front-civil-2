
import clientAxios from '@/clients/clientAxios'
import FloatButton from '@/components/general/FloatButton'
import ModalGeneral from '@/components/general/ModalGeneral'
import ReportCard from '@/components/report/ReportCard'
import ReportForm from '@/components/report/ReportForm'
import ReportTypeButton from '@/components/report/ReportTypeButton'
import useProject from '@/hooks/useProject'
import { MishapData, mishapsSchema, ProgressData, progressListSchema, ReportType } from '@/types'
import { isAxiosError } from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Report() {
  const {type: typeParams, reportId: reportIdParams} = useLocalSearchParams<{
    type: string,
    reportId: string
  }>()
  const { projectId } = useProject()

  const [type, setType] = useState<ReportType>("progress")
  const [progress, setProgress] = useState<ProgressData[]>([])
  const [mishaps, setMishaps] = useState<MishapData[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const getData = async () => {
    const getProgress = clientAxios(`/project/${projectId}/progress`)
    const getMishaps = clientAxios(`/project/${projectId}/mishap`)

    try {
      const [progressData, mishapsData] = await Promise.all([getProgress, getMishaps])
      const responseProgress = progressListSchema.safeParse(progressData.data)
      if (responseProgress.data) {
        setProgress(responseProgress.data)
      }
      const responseMishaps = mishapsSchema.safeParse(mishapsData.data)
      if (responseMishaps.success) {
        setMishaps(responseMishaps.data)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }

  const changeType = (typeSelect: ReportType) => {
    setType(typeSelect)
  }

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const validateItems = () => {
    if (type === "mishap") {
      return mishaps.length > 0
    } else if (type === "progress") {
      return progress.length > 0
    } else {
      return false
    }
  }

  useEffect(() => {
    getData()
  }, [projectId, typeParams, reportIdParams])



  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Reportes</Text>
      <Text style={styles.textInfo}>Escoge el tipo de reporte que deseas ver!</Text>
      <ReportTypeButton type={type} action={changeType} />
      <Text style={styles.textInfo}>{validateItems() ? `Acá tienes la lista de ${type === "progress" ? "avances" : "percances"}.` : `No hay registros de ${type === "progress" ? "avances" : "percances"}.`}</Text>
      <ScrollView>
        <View style={{ flex: 1, gap: 10, }}>
          {type === 'mishap' ? (
            mishaps.map(mishap => <ReportCard key={mishap.id} data={mishap} type={type} />)
          ) : (
            progress.map(progressState => <ReportCard key={progressState.id} data={progressState} type={type} />)
          )}
        </View>
      </ScrollView>
      <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
        <ReportForm type={type} changeModalVisible={changeModalVisible} projectId={projectId} setMishaps={setMishaps} setProgress={setProgress} />
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
