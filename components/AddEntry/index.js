// External Components
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Our Components
import DateHeader from '../DateHeader'
import FitnessSlider from '../FitnessSlider'
import FitnessStepper from '../FitnessStepper'

// Our Helpers
import { getMetricMetaInfo, timeToString } from '../../utils/helpers'


const SubmitButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>Submit</Text>
  </TouchableOpacity>
)

export default class AddEntry extends Component {
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

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })

    // We want to:


    // Update Redux store (Dispatch action)

    // Save to DB

    // Clear local notification
  }

  render () {
    const metaInfo = getMetricMetaInfo();

    return (
      <View>
        < DateHeader date={new Date().toLocaleDateString()} />
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