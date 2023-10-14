import {Component} from 'react'

import Header from '../Header'
import MovieCard from '../MovieCard'

import './index.css'

class TopRatedMovies extends Component {
  state = {moviesList: []}

  componentDidMount() {
    this.getTopMovies()
  }

  getTopMovies = async () => {
    const API_KEY = '431638642f31349b2ff8d33b4dd83a2e'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        overview: eachItem.overview,
        imageUrl: eachItem.poster_path,
        rating: eachItem.vote_average,
      }))
      this.setState({
        moviesList: updatedData,
      })
      console.log(updatedData)
    }
  }

  renderMoviesListView = () => {
    const {moviesList} = this.state

    return (
      <div className="all-movies-container">
        <ul className="movies-list">
          {moviesList.map(eachMovie => (
            <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">{this.renderMoviesListView()}</div>
      </div>
    )
  }
}

export default TopRatedMovies
