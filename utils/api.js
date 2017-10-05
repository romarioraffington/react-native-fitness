// External Dependenceis
import { AsyncStorage } from 'react-native'

// Our Dependencies
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

export const fetchCalendarResults = () => (
  AsyncStorage
    .getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
)

export const submitEntry = ({ entry, key }) => (
  AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry,
  }))
)

export const removeEntry = (key) => (
  AsyncStorage
    .getItem(CALENDAR_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
)