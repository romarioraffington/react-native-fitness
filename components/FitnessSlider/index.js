import React from 'react'
import { View, Text, Slider } from 'react-native'

export default FitnessSlider = ({ max, unit, step, value, onChange}) =>  (
  <View>
    <Slider 
      step={step}
      value={value}
      maximumValue={max}
      minimumValue={0}
      onValueChange={onChange}
    />
    <View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  </View>
)