import React, { createRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";

function Stack ({ stagingList, onAllSwiped, handleSwipe, navigation }, parentRef) {
  const [swiped] = useState(() => new Set())
  // const [interaction] = useState(new InteractionHandle())
  const [delayed, setDelayed] = useState(true)
  const onSwipe = (direction, movie) => {
    swiped.add(movie.id)
    handleSwipe(direction, movie)
    if (stagingList.length === swiped.size) {
      console.log("fetching more movies")
      onAllSwiped()
      swiped.clear()
    }
  }
  useLayoutEffect(() => {
    setTimeout(() => setDelayed(false), 800)
  }, [])
  const childRefs = useMemo(() =>
    Array.from({ length: stagingList.length }).map((_) => createRef(), [])
  )

  useImperativeHandle(
    parentRef, () => ({
      imperativeSwipe: (dir) => {
        const remaining = stagingList.filter((movie) => !swiped.has(movie.id))
        const toBeRemoved = remaining[remaining.length - 1]
        const index = stagingList.map((movie) => movie.id).indexOf(toBeRemoved.id)
        childRefs[index].current.swipe(dir)
      }
    }))
  if (delayed) return null
  return stagingList.map((movie, i) => (
    <MovieCard
      index={i}
      movie={movie}
      ref={childRefs[i]}
      key={movie.id}
      navigation={navigation}
      handleSwipe={onSwipe}
    />
  ))
}

const CardStack = React.forwardRef(Stack)
export default CardStack
