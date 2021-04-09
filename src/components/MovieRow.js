import React, { useCallback } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import StarRating from './StarRating'
import Genres from './Genres'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen')
const Row = styled.View`
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 5px;
  margin-left: 3px;
  height: 200px;
`
const MoviePoster = styled.Image`
  height: 100%;
  border-radius: 10px;
`
const MovieDetails = styled.View`
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
`
const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  width: 100%;
  /* text-align: center; */
  margin-bottom: 2%;
`
const Description = styled.Text`
  font-size: 13px;
  font-weight: 500;
  width: 70%;
  margin-bottom: 2%;
`
const Rating = styled.Text`
  font-weight: 700;
  /* align-self: flex-start; */
`

function ItemRow ({ index, item, separators, navigate }) {
  const { posterUrl, title, releaseDate, rating, mainGenre, overview, movieId } = item
  console.log(index, title, 'rendered')
  const NavigateToDetails = () => navigate(movieId)
  return (
    <Row>
      <TouchableOpacity
        onPress={NavigateToDetails}
        style={{ width: width / 3, borderRadius: 10 }}
      >
        <MoviePoster source={{ uri: posterUrl }} />
      </TouchableOpacity>
      <MovieDetails>
        <TouchableOpacity onPress={NavigateToDetails}>
          <Title>{title} </Title>
        </TouchableOpacity>
        <Rating>{moment(releaseDate).format('MMM YYYY')} </Rating>
        <StarRating rating={rating} size={24} />
        <Genres genreList={mainGenre} />
        <Rating>Overview:</Rating>
        <Description>
          {overview && overview.length < 90 ? overview : overview.slice(0, 87) + '...'}
        </Description>
      </MovieDetails>
    </Row>
  )
}
const MovieRow = React.memo(ItemRow, (prev, next) => JSON.stringify(prev) === JSON.stringify(next))
export default MovieRow
