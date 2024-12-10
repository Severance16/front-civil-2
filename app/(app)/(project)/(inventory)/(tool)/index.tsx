import clientAxios from '@/clients/clientAxios'
import ModalGeneral from '@/components/general/ModalGeneral'
import NoteCard from '@/components/note/NoteCard'
import NoteForm from '@/components/note/NoteForm'
import ToolEditForm from '@/components/tool/ToolEditForm'
import ToolInformation from '@/components/tool/ToolInformation'
import { NoteTooltData, ToolData, toolSchema } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { isAxiosError } from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

const notas: NoteTooltData[] = [
  {
    id: 1,
    description: "Compra",
    type: "Ingreso",
    createdAt: "2024-10-20 05:00:00",
    date: "2024-10-20 05:00:00",
    quantity: 2,
    toolId: 1,
  },
  {
    id: 2,
    description: "Venta",
    type: "Egreso",
    createdAt: "2024-10-20 05:00:00",
    date: "2024-10-20 05:00:00",
    quantity: 1,
    toolId: 1,
  }
]

export default function Tool() {
  const { toolId } = useLocalSearchParams<{ toolId: string }>()
  const [tool, setTool] = useState<ToolData>()
  const [notes, setNotes] = useState<NoteTooltData[]>(notas)
  const [modalVisible, setModalVisible] = useState(false)
  const [typeForm, setTypeForm] = useState<"edit" | "create">("edit")

  const getInput = async () => {
    if (toolId === undefined || toolId === "" || toolId === null) {
      return
    }

    try {
      const { data } = await clientAxios(`/project/tool/${toolId}`)

      const response = toolSchema.safeParse(data)
      if (response.success) {
        setTool(response.data)
      } else {
        Alert.alert("Algo sucedio.")
        return
      }

      const notesReq = await clientAxios(`/project/tool/${response.data.id}/note`)

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const handleEditTool = () => {
    setTypeForm("edit")
    changeModalVisible()
  }
  const handleCreateNote = () => {  
    setTypeForm("create")
    changeModalVisible() 
  }

  useEffect(() => {
    getInput()
  }, [toolId])

  if (tool === undefined) return (<Text>Cargando...</Text>)

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Inventario</Text>
      {tool.createdAt && (
        <Text style={styles.createdAtd}>Generado: {formatDateLabel(tool.createdAt)}</Text>
      )}
      <View style={styles.containerInfo}>
        <ToolInformation tool={tool} />
      </View>

      <Text style={styles.tittle}>Notas</Text>

      <View style={styles.constainerTableNotes}>
        {notes.length > 0 ? (
          <>
            <View style={styles.containerLabelTableNotes}>
              <Text style={styles.labelTable}>Fecha</Text>
              <Text style={styles.labelTable}>Cantidad</Text>
              <Text style={styles.labelTable}>Tipo</Text>
            </View>
            <ScrollView>
              {notes.map(note => <NoteCard key={note.id} note={note} />)}
            </ScrollView>
          </>
        ) :
          <Text>No hay registros.</Text>
        }
      </View>
      <Text style={styles.tittle}>Acciones</Text>

      <View style={styles.actionsContainer}>
        <TouchableNativeFeedback onPress={handleEditTool}>
          <View style={styles.actionButton}>
            <MaterialCommunityIcons name="pencil-outline" size={24} color="#EFAD29" />
            <Text style={{ width: "auto" }}>Editar</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleCreateNote}>
          <View style={styles.actionButton}>
            <MaterialCommunityIcons name="note-plus-outline" size={24} color="#EFAD29" />
            <Text style={{ width: "auto" }}>Nota</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
        {typeForm === 'edit' && (<ToolEditForm tool={tool} setTool={setTool} changeModalVisible={changeModalVisible}/>)}
        {typeForm === "create" && (<NoteForm />)}
      </ModalGeneral>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
    paddingTop: 10,
  },
  tittle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#EFAD29",
  },
  containerInfo: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
    marginBottom: 10
  },
  createdAtd: {
    fontSize: 12,
    paddingLeft: 10,
    color: "#5B5B5E"
  },
  constainerTableNotes: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  containerLabelTableNotes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  labelTable: {
    width: 100,
    textAlign: "center",
    fontWeight: "500",
    color: "#262829"
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  },
  actionButton: {
    width: 90,
    height: 90,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  }
});
