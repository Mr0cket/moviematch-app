import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { View, PanResponder } from 'react-native'
import { animated, useSprings } from 'react-spring/native'
import animateOut from '../../lib/animateOut'
import configResponder from '../../lib/configResponder'
import InteractionHandle from '../../lib/InteractionHandle'
import MovieCard from './MovieCard'
import MovieDetails from './MovieDetails'
const to = (i) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: -10 + Math.random() * 20,
  opacity: 1
})
const AnimatedView = animated(View)

function Stack ({ listId, stagingList, onAllSwiped, onSwipe, navigation }, parentRef) {
  const [swiped] = useState(new Set())
  const [interaction] = useState(new InteractionHandle())
  const [props, setSprings] = useSprings(stagingList.length, (i) => ({
    to: to(i),
    onRest: () => interaction.clearAnimation(i)
  }))

  const getCurrentItem = () => stagingList[stagingList.length - swiped.size - 1]

  const handleSwipe = (direction) => {
    const movie = getCurrentItem()
    const dir = direction
    swiped.add(movie.movieId)
    console.log(swiped)
    interaction.runAfterAnimation(() => {
      onSwipe(dir, movie)
    })
    if (swiped.size === stagingList.length) {
      interaction.runAfterAll(onAllSwiped)
    }
  }

  const handlePress = (movieId) => navigation.navigate('MovieDetails', { movieId })

  React.useImperativeHandle(parentRef, () => ({
    imperativeSwipe (direction = 'RIGHT') {
      const index = stagingList.length - swiped.size - 1
      const toBeRemoved = stagingList[index]
      const sign = direction === 'RIGHT' ? 1 : -1
      interaction.startInteraction(index)
      animateOut(index, { vx: sign }, setSprings)
      interaction.endInteraction()
      handleSwipe(direction, toBeRemoved)
    }
  }))

  return props.map(({ x, y, rot, scale, opacity }, i) => {
    const handle = useRef(PanResponder.create(configResponder(i, setSprings, handleSwipe, interaction)))
    return (
      <View key={stagingList[i].movieId} style={{ position: 'absolute' }}>
        <AnimatedView
          {...handle.current.panHandlers}
          style={{
            transform: [
              { translateX: x },
              { translateY: y },
              { scale }
              // { rotate: rot.interpolate((rot) => `${rot}deg`) }
            ]
          }}
        >
          <MovieCard poster={stagingList[i].posterUrl} handlePress={handlePress} movieId={stagingList[i].movieId} />
        </AnimatedView>
        <AnimatedView style={{ opacity }}>
          <MovieDetails movie={stagingList[i]} />
        </AnimatedView>
      </View>
    )
  })
}
const CardStack = forwardRef(Stack)

export default CardStack
