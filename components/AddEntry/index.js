// External Components
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// Our Components
import DateHeader from '../DateHeader'
import TextButton from '../TextButton'
import FitnessSlider from '../FitnessSlider'
import FitnessStepper from '../FitnessStepper'

// Our Helpers
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../../utils/helpers'
import { submitEntry, removeEntry } from '../../utils/api'

// Our Actions
import { addEntry } from '../../actions'


const SubmitButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>Submit</Text>
  </TouchableOpacity>
)

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  // Methods

  increment = (metric) => {
    const { max, step }= getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]:  (count > max) ? max : count
      }
    })
  }
 
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] +  getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]:  (count < 0) ? 0 : count
      }
    })
  }

  slide = (metric, value) => this.setState({ [ metric ]: value })

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.dispatch(addEntry({
      [key]: entry,
    }))

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })

    // We want to:

    // Navigate Home

    submitEntry({ key, entry })

    // Clear local notification
  }

  reset = () => {
    const key = timeToString();
   
    // We want to:
    
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue(),
    }))

    // Route to Home

    removeEntry(key)
  }

  render () {
    const metaInfo = getMetricMetaInfo();

    if (this.props.isLogged) {
      return (
        <View>
          <Ionicons 
            name='ios-happy-outline' 
            size={100} 
          />
          <Text> You alread logged your information for today</Text>
          <TextButton onPress={this.reset}> Reset </TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        { Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              { type === 'slider' 
                  ? <FitnessSlider
                      value={value}
                      onChange={value => this.slide(key, value)}
                      { ...rest }
                    />
                  : <FitnessStepper
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      { ...rest }
                    />
              }
            </View>
          )
        })}
        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

// Redux
export const mapStateToProps = (state = {}) => {
  const key = timeToString();
  
  return {
    isLogged: state[key] && typeof state[key].today === 'undefined',
  }
}

export default connect(
  mapStateToProps,
)(AddEntry)