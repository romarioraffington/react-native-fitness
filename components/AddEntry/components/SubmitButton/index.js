// External Components
import React from 'react'
import { white, purple } from '../../../../utils/colors'
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'

export default SubmitButton = ({ onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={Platform.OS === 'ios' ? styles.iosSubmitButton : styles.androidSubmitButton}
    >
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
)

// Styles
const styles = StyleSheet.create({
  iosSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})