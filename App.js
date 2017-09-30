// External Components
import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Our Components
import AddEntry from './components/AddEntry'

// Our Reducers
import reducer from './reducer' 

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <AddEntry />
        </View>
     </Provider>
    );
  }
}
