// External Components
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import devToolsEnhancer from 'remote-redux-devtools';

// Our Depdencies
import { purple, white } from './utils/colors'

// Our Components
import AddEntry from './components/AddEntry'
import History from './components/History'

// Our Reducers
import reducer from './reducers' 

// Tabs
const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios'? purple: white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
})

// Status Bar
const FitnessStatusBar = ({ backgroundColor, props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor}c
      { ...props }
    />
  </View>
)
// Boostrap store
const store = createStore(reducer, devToolsEnhancer());

export default () => (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <FitnessStatusBar backgroundColor={white} barStyle='light-content'/>
      <Tabs />
    </View>
  </Provider>
)
