import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// screens
import MainTabsNavigator from './MainTabs'
import SignInScreen from '../screens/SignIn'
import SignUpScreen from '../screens/SignUp'
import NotFoundScreen from '../screens/NotFound'
import useLocale from '../hooks/useLocale'
import MovieDetails from '../screens/MovieDetails'
import { getUserWithStoredToken } from '../store/user/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../store/user/selectors'
import { Entypo } from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { fetchStagingList } from '../store/staging/actions'
import { fetchMovieList } from '../store/movies/actions'

// create navigator
const RootStack = createStackNavigator()

export default function Navigation () {
  useLocale()
  const navigationRef = useRef()
  const dispatch = useDispatch()
  const userToken = useSelector(selectToken)
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    async function prepare () {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font)
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        if (!userToken) await getToken()
        await Promise.all([dispatch(fetchStagingList(true)), dispatch(fetchMovieList('matches')), dispatch(fetchMovieList('liked'))])
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }
    const getToken = async () => {
      const cachedToken = await AsyncStorage.getItem('token')
      if (cachedToken) {
        await dispatch(getUserWithStoredToken(cachedToken))
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync().then((fulfilled) => new Promise(resolve => setTimeout(() => resolve(), 500)))
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  // theme={systemTheme === "dark" ? DarkTheme : DefaultTheme}
  // useReduxDevToolsExtension(navigationRef)

  // get AppState from store
  return !userToken
    ? (
      <NavigationContainer onReady={onLayoutRootView} ref={navigationRef}>
        <RootStack.Navigator mode='modal' headerMode='none'>
          <RootStack.Screen
            name='SignIn'
            options={{
              title: 'Sign In'
            }}
            component={SignInScreen}
          />
          <RootStack.Screen
            name='SignUp'
            component={SignUpScreen}
            options={{
              title: 'Sign Up'
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      )
    : (
      <NavigationContainer onReady={onLayoutRootView} ref={navigationRef}>
        <RootStack.Navigator mode='modal' headerMode='none'>
          {/* https://reactnavigation.org/docs/screen#children */}
          <RootStack.Screen name='Main'>
            {(props) => <MainTabsNavigator {...props} userToken={userToken} />}
          </RootStack.Screen>
          <RootStack.Screen name='MovieDetails' component={MovieDetails} />
          <RootStack.Screen name='NotFound' component={NotFoundScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
      )
}

/*   return (
    <NavigationContainer onReady={onLayoutRootView} ref={navigationRef}>
      <RootStack.Navigator mode='modal' headerMode='none'>
        {!userToken
          ? (
            <>
              <RootStack.Screen
                name='SignIn'
                options={{
                  title: 'Sign In'
                }}
                component={SignInScreen}
              />
              <RootStack.Screen
                name='SignUp'
                component={SignUpScreen}
                options={{
                  title: 'Sign Up'
                }}
              />
            </>
            )
          : (
            <>
              <RootStack.Screen name='Main'>
                {(props) => <MainTabsNavigator {...props} userToken={userToken} />}
              </RootStack.Screen>
              <RootStack.Screen name='MovieDetails' component={MovieDetails} />
            </>
            )}
        <RootStack.Screen name='NotFound' component={NotFoundScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
 */