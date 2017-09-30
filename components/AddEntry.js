// External Components
import React, { Component } from 'react'
import { View, Text } from 'react-native'

// Our Components
import Slider from './Slider'
import Stepper from './Stepper'

// Our Helpers
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step }= getMetricMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]:  (count > max) ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] +  getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]:  (count < 0) ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState({ [metric]: value });
  }

  render () {
    const metaInfo = getMetricMetaInfo();

    return (
      <View>
        { Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              { type === 'slider' 
                  ? <Slider
                      value={value}
                      onChange={value => this.slide(key, value)}
                      { ...rest }
                    />
                  : <Stepper
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      { ...rest }
                    />
              }
            </View>
          )
        })}
      </View>
    )
  }
}