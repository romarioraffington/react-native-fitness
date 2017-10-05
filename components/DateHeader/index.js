// External Dependencies
import React from 'react'
import { Text } from 'react-native'

// Our Dependencies
import { purple } from '../../utils/colors'

export default ({ date }) => {
  return (
    <Text style={[{ color: purple, fontSize: 25 }]}>
      { date }
    </Text>
  )
}
