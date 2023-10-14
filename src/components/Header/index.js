import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

import './index.css'

const Header = props => {
  const {searchDetails} = props
  const [searchInput, setInput] = useState('')

  const onChangeSearchInput = e => {
    setInput(e.target.value)
  }

  const onClickButton = () => {
    const {history} = props
    searchDetails(searchInput)
    history.replace('/search-results')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left-section">
        <h1 className="title">movieDB</h1>
        <ul className="navbar-menu-container">
          <Link to="/">
            <li className="nav-link">Popular</li>
          </Link>
          <Link to="/top-rated">
            <li className="nav-link">Top Rated</li>
          </Link>
          <Link to="/upcoming">
            <li className="nav-link">Upcoming</li>
          </Link>
        </ul>
      </div>
      <div className="navbar-right-section">
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search Movies..."
            value={searchInput}
            onChange={onChangeSearchInput}
          />

          <button type="button" onClick={onClickButton} className="search-btn">
            Search
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
