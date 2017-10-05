// External Dependencies
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

// Our Dependencies
import { purple } from '../../utils/colors'

export default({ children, onPress, style = {} }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={[ styles.button, style ]}> {children} </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    padding: 10,
    color: purple,
    fontSize: 20,
  }
})