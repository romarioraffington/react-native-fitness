import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default({ children, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text> {children} </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    padding: 10
  }
})