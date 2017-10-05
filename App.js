// External Components
import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import devToolsEnhancer from 'remote-redux-devtools';

// Our Components
import AddEntry from './components/AddEntry'
import History from './components/History'

// Our Reducers
import reducer from './reducers' 

// Boostrap store
const store = createStore(reducer, devToolsEnhancer());

export default () => (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <History />
    </View>
  </Provider>
)
