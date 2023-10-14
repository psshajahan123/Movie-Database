import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, imageUrl, rating} = movieDetails

  return (
    <li className="movie-list-item">
      <img
        src={`https://image.tmdb.org/t/p/original${imageUrl}`}
        className="image"
        alt={title}
      />
      <p className="name-heading">{title}</p>
      <p className="rating">{rating}</p>
      <Link to={`/movie/${id}`}>
        <button type="button" className="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
