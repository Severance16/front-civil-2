import clientAxios from '@/clients/clientAxios'
import ModalGeneral from '@/components/general/ModalGeneral'
import InputEditForm from '@/components/input/InputEditForm'
import InputInformation from '@/components/input/InputInformation'
import NoteCard from '@/components/note/NoteCard'
import { InputData, inputSchema, NoteInputData, notesInputSchema } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { isAxiosError } from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

export default function Input() {
  const {inputId} = useLocalSearchParams<{ inputId: string }>()
  const [input, setInput] = useState<InputData>()
  const [notes, setNotes] = useState<NoteInputData[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [typeForm, setTypeForm] = useState<"edit" | "create">("edit")

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
        return
      }
      
      const notesReq = await clientAxios(`/project/input/${response.data.id}/note`)
      const responseNotes = notesInputSchema.safeParse(notesReq.data)
      if (responseNotes.success) {
        setNotes(responseNotes.data)
      }

    } catch (error) {
      console.log(error)
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const handleEditInput = () => {
    setTypeForm("edit")
    changeModalVisible()
  }
  const handleCreateNote = () => {  
    setTypeForm("create")
    changeModalVisible() 
  }

  useEffect(() => {
    getInput()
  }, [inputId])

  if (input === undefined) return (<Text>Cargando...</Text>)

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Inventario</Text>
      {input.createdAt && (
        <Text style={styles.createdAtd}>Generado: {formatDateLabel(input.createdAt)}</Text>
      )}
      <View style={styles.containerInfo}>
        <InputInformation input={input} />
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
          <Text style={{textAlign: "center"}}>No hay registros.</Text>
        }
      </View>
      <Text style={styles.tittle}>Acciones</Text>

      <View style={styles.actionsContainer}>
        <TouchableNativeFeedback onPress={handleEditInput}>
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
        {typeForm === 'edit' && (<InputEditForm input={input} setInput={setInput} changeModalVisible={changeModalVisible}/>)}
        {/* {typeForm === "create" && (<NoteToolForm toolId={tool.id} setNotes={setNotes} changeModalVisible={changeModalVisible} setTool={setTool}/>)} */}
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
