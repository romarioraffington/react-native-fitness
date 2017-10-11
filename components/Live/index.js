import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default class Live extends Component {
  state = {
    cordinates: null,
    status: 'null',
    direction: ''
  }
  render () {
    const { status, cordinates, direction } = this.state

    if (status === null) {
      return <ActivityIndicator style={{margin:30}} />
    } else if (status === 'denied') {
      return (
        <View>
          <Text>Denied</Text>
        </View>
      )
    } else if (status === 'undetermined') {
      return (
        <View>
          <Text>undetermined</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>Live</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    )
  }
}