// External Dependencies
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

// Our Components
import DateHeader from '../DateHeader'
import MetricCard from '../MetricCard'
import UdacityFitnessCalendar from 'udacifitness-calendar'

// Our Dependencies
import { receiveEntries, addEntry } from '../../actions'
import { timeToString, getDailyReminderValue } from '../../utils/helpers'
import { white } from '../../utils/colors'
import { fetchCalendarResults } from '../../utils/api'

class History extends Component {
  state = {
    isLoading: true
  }

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
      .then(() => this.setState({ isLoading: false }))
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
        : <TouchableOpacity onPress={() => this.props.navigation.navigate( 
          'EntryDetail', {
            entryId: key,
          })}>
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
    const { entries } = this.props
    
    if (this.state.isLoading) {
      return (
        <AppLoading />
      )
    }

    return (
      <UdacityFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

// Styles
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
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// Redux
const mapStateToProps = (entries) => ({ entries })

export default connect(
  mapStateToProps,
)(History)