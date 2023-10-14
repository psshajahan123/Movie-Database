import './App.css'

import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route path="/top-rated" component={TopRatedMovies} />
    <Route path="/upcoming" component={UpcomingMovies} />
    <Route path="/search-results" component={SearchedMovies} />
    <Route exact path="/movie/:id" component={MovieDetails} />
  </Switch>
)

export default App
