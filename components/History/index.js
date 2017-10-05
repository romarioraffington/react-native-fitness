// External Dependencies
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

// Our Components
import UdacityFitnessCalendar from 'udacifitness-calendar'

// Our Dependencies
import { receiveEntries, addEntry } from '../../actions'
import { timeToString, getDailyReminderValue } from '../../utils/helpers'
import { fetchCalendarResults } from '../../utils/api'

// Redux
const mapStateToProps = (entries) => ({ entries })

export class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ payload: entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue() 
          }))
        }
      })
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      { today 
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text> 
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => (
    <View>
      <Text>No data for this day</Text>
    </View>
  )

  render() {
    const { entries, isReady } = this.props
    
    return (
      entries ? (
        <UdacityFitnessCalendar
          items={entries}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
        />
      ): <View><Text>Loading...</Text></View>
    )
  }
}

export default connect(
  mapStateToProps,
)(History)