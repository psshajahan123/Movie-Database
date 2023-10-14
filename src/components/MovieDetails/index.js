import {Component} from 'react'

import './index.css'
import Header from '../Header'

class MovieDetails extends Component {
  state = {movieData: {}}

  componentDidMount() {
    this.getMovie()
  }

  getFormattedData = data => ({
    name: data.title,
    imageUrl: data.poster_path,
    ratings: data.vote_average,
    duration: data.runtime,
    genre: data.genres,
    releaseDate: data.release_date,
    overview: data.overview,
  })

  getMovie = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '431638642f31349b2ff8d33b4dd83a2e'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      console.log(updatedData)
      this.setState({movieData: updatedData})
    }
  }

  renderMovieDetails = () => {
    const {movieData} = this.state
    const {imageUrl, name, ratings, duration, releaseDate, overview} = movieData
    return (
      <div className="movie-details-container">
        <div className="movie-image-container">
          <img
            src={`https://image.tmdb.org/t/p/original${imageUrl}`}
            className="poster-image"
            alt={name}
          />
        </div>
        <div className="movie-content-container">
          <h1>{name}</h1>
          <div className="movie-content-inner-div">
            <p>Rating: {ratings}</p>
            <p>Duration: {duration} mins</p>
            <p>{releaseDate}</p>
          </div>
          <p className="overview-text">{overview}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">{this.renderMovieDetails()}</div>
      </div>
    )
  }
}

export default MovieDetails
