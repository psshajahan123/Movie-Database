import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'

import MovieCard from '../MovieCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchedMovies extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getMovies()
  }

  onSearchInput = value => {
    this.setState({searchInput: value})
  }

  getMovies = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const API_KEY = '431638642f31349b2ff8d33b4dd83a2e'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1`
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
        apiStatus: apiStatusConstants.success,
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

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="Circles" color="#bbbbbb" height="500" width="50" />
    </div>
  )

  renderAllMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header searchDetails={this.onSearchInput} />
        <div className="app-content">{this.renderAllMovies()}</div>
      </div>
    )
  }
}

export default SearchedMovies
