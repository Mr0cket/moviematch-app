import { View, ActivityIndicator, Dimensions } from 'react-native'
import React, { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
// icons
import { Entypo } from '@expo/vector-icons'

// components
import Button from './LikeButton'
import { fetchStagingList } from '../../store/staging/actions'
import { movieDisliked, movieliked } from '../../store/socketActions'
import Container from '../../components/Container'
import { selectMatchModal, selectStagingList } from '../../store/movies/selectors'
import MatchModal from './MatchModal'
import Title from '../../components/Title'
import CardStack from './CardStack'

const { width, height } = Dimensions.get('window')

const ButtonRow = styled.View`
  flex-direction: row;
`

export default function index ({ navigation, route }) {
  const dispatch = useDispatch()
  const modalMovie = useSelector(selectMatchModal)
  const stagingList = useSelector(selectStagingList, (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  const [isMounted, setMounted] = useState(false)
  const mountStack = (id) => setMounted(true)
  const unmountStack = (id) => setMounted(false)

  const handleLike = (movie) => {
    dispatch(movieliked(movie))
  }
  useEffect(
    () => {
      if (stagingList.length < 2) dispatch(fetchStagingList(true))
      else mountStack(0)
    }, [stagingList, isMounted])

  const handleDislike = (movie) => {
    dispatch(movieDisliked(movie))
  }
  const onSwipe = (direction, movie) => {
    console.log('[onSwipe] direction:', direction)
    switch (direction) {
      case 'RIGHT':
        return handleLike(movie)
      case 'LEFT':
        return handleDislike(movie)
    }
  }
  const handleAllSwiped = (listId) => {
    console.log('onAllSwiped called')
    unmountStack(listId)
    dispatch(fetchStagingList(false))
  }

  const stack = createRef()
  if (stagingList.length > 0) {
    console.log(`stack is ${isMounted ? '' : 'un'}mounted`)
    return (
      <Container>
        <View style={{ width: width / 1.17, height: height / 1.26 }}>
          {isMounted && (
            <CardStack
              listId={0}
              ref={stack}
              stagingList={stagingList}
              onAllSwiped={handleAllSwiped}
              onSwipe={onSwipe}
              navigation={navigation}
            />
          )}
        </View>
        <ButtonRow>
          <Button
            text={<Entypo name='thumbs-down' size={32} color='#f0ece3' />}
            style={{ backgroundColor: '#900d0d', borderColor: '#810000' }}
            onPress={() => stack.current.imperativeSwipe('LEFT')}
          />
          <Button
            text={<Entypo name='thumbs-up' size={32} color='#f0ece3' />}
            style={{ backgroundColor: '#158467', borderColor: '#065446' }}
            onPress={() => stack.current.imperativeSwipe('RIGHT')}
          />
        </ButtonRow>
        {modalMovie && <MatchModal navigation={navigation} modalMovie={modalMovie} />}
      </Container>
    )
  } else {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <Title>Loading Movies</Title>
        <ActivityIndicator size='large' color='blue' />
      </Container>
    )
  }
}
