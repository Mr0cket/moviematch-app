import { StatusBar } from 'expo-status-bar'
import reduxStore from './store'
import React from 'react'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'
import { Provider } from 'react-redux'
import Navigation from './navigation'

export default function App () {
  const systemTheme = useColorScheme()
  return (
    <Provider store={reduxStore}>
      <Navigation systemTheme={systemTheme} />
      <StatusBar style='auto' />
    </Provider>
  )
}
/* Need to figure out how this works */
/* Add this later to get rid of the stupid header */

/*
 */
