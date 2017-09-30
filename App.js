// External Components
import React, { Component } from 'react'
import { View } from 'react-native'

// Our Components
import AddEntry from './components/AddEntry'

export default class App extends Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
