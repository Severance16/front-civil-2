import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function FloatButton({handlePress}: {handlePress: () => void}) {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 30, // Distancia desde la parte inferior
      right: 30, // Distancia desde la parte derecha
      backgroundColor: '#EFAD29', // Color del botón
      width: 60, // Ancho
      height: 60, // Alto
      borderRadius: 30, // Hace que sea un círculo
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Sombra en Android
    },
    buttonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
