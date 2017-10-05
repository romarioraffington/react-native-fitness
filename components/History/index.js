// External Dependencies
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// Our Components
import DateHeader from '../DateHeader'
import MetricCard from '../MetricCard'
import UdacityFitnessCalendar from 'udacifitness-calendar'

// Our Dependencies
import { receiveEntries, addEntry } from '../../actions'
import { timeToString, getDailyReminderValue } from '../../utils/helpers'
import { white } from '../../utils/colors'
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
    <View style={styles.item}> 
      { today 
        ? <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
         </View>
        : <TouchableOpacity onPress={() => console.log('Pressed')}>
            <MetricCard metrics={metrics} date={formattedDate} />
          </TouchableOpacity>
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => (
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDataText}>No data logged for this day 😪</Text>
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    marginTop: 20,
    padding: 20,
    justifyContent: 'center'
  },
  noDataText: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20,
  }
})

export default connect(
  mapStateToProps,
)(History)