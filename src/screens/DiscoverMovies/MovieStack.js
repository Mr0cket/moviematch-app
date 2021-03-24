import React, { createRef, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectStagingList } from "../../store/movies/selectors";
import MovieCard from "./MovieCard";

export default function MovieStack({ onAllSwiped, handleSwipe, navigation, swipe }) {
  const [swiped] = useState(() => new Set());
  const stagingList = useSelector(selectStagingList);
  const onSwipe = (direction, movie) => {
    handleSwipe(direction, movie);
    swiped.add(movie.id);
    console.log("swiped", swiped.size);
    console.log("stagingList", stagingList.length);
    if (stagingList.length === swiped.size) {
      console.log("fetching more movies");
      onAllSwiped();
      swiped.clear();
    }
  };
  const childRefs = useMemo(() =>
    Array.from({ length: stagingList.length }).map((_) => createRef(), [])
  );
  const imperativeSwipe = (dir) => {
    const remaining = stagingList.filter((movie) => !swiped.has(movie.id));
    const toBeRemoved = remaining[remaining.length - 1];
    const index = stagingList.map((movie) => movie.id).indexOf(toBeRemoved.id);
    childRefs[index].current.swipe(dir);
    onSwipe(dir, toBeRemoved);
  };

  useEffect(() => {
    if (swipe.dir) imperativeSwipe(swipe.dir);
  }, [swipe]);

  return stagingList.map((movie, i) => (
    <MovieCard
      movie={movie}
      ref={childRefs[i]}
      key={movie.id}
      navigation={navigation}
      handleSwipe={onSwipe}
    />
  ));
}
