// External Dependencies
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

// Our Dependencies
import { white, gray, purple } from '../../utils/colors'

export default ({ max, unit, step, value, onIncrement, onDecrement }) => (
  <View style={[styles.row, { justifyContent: 'space-between' }]}>
    { Platform.OS === 'ios' ?
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.iosButton, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} onPress={onDecrement}>
            <Entypo name='minus' size={30} color={purple} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iosButton, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]} onPress={onIncrement}>
            <Entypo name='plus' size={30} color={purple} />
          </TouchableOpacity>
        </View>
      
      : <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.androidButton, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} onPress={onDecrement}>
            <FontAwesome name='minus' size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.androidButton, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]} onPress={onIncrement}>
            <FontAwesome name='plus' size={30} color={white} />
          </TouchableOpacity>
        </View>
    }
    <View style={styles.metricCounter}>
      <Text style={[{ fontSize: 24 }]}>{value}</Text>
      <Text style={[{ fontSize: 18, color: gray }]}>{unit}</Text>
    </View>
  </View>
)

// Styles
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosButton: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidButton: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  }
})