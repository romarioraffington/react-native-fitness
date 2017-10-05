// External Dependencies
import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

// Our Components
import DateHeader from '../DateHeader'

// Our Dependencies
import { getMetricMetaInfo } from '../../utils/helpers'
import { gray } from '../../utils/colors'


export default ({ date, metrics }) => (
  <View> 
    { date && <DateHeader date={date} />}
    { Object.keys(metrics).map(metric => {
      const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
   
      return (
        <View style={styles.metric} key={metric}>
          { getIcon() }
          <View>
            <Text style={{fontSize: 20}}>
              {displayName}
            </Text>
            <Text style={{fontSize: 16, color: gray}}>
              { metrics[metric] } { unit }
            </Text>
          </View>
        </View>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 20,
  }
})

