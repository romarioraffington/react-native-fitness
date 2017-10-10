// External Dependencies
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

// Our Components
import MetricCard from '../MetricCard'
import TextButton from '../TextButton'

// Our Dependencies
import { addEntry } from '../../actions'
import { removeEntry } from '../../utils/api'
import { white } from '../../utils/colors'
import { timeToString, getDailyReminderValue } from '../../utils/helpers'

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) =>  {
    const { entryId } = navigation.state.params

    // Format Date
    const year = entryId.slice(0, 4)
    const month = entryId.slice(5, 7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  } 


  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render () {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20, textAlign: 'center' }}>
          Reset
        </TextButton>
      </View>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

// Redux
const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId],
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
    })),
    goBack: () => navigation.goBack()
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(EntryDetail)