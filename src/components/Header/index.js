import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoMenu, IoCloseCircle} from 'react-icons/io5'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

import MyContext from '../../context/MyContext'
import './index.css'

class Header extends Component {
  state = {
    currentPathName: '',
  }

  componentDidMount() {
    const {history} = this.props
    const {location} = history
    const {pathname} = location

    this.setState({currentPathName: pathname})
  }

  onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderSearchCard = () => (
    <div className="header-search-card">
      <input
        className="header-search-input"
        type="search"
        placeholder="Search Caption"
      />
      <button
        aria-label="search icon"
        type="button"
        className="header-search-button"
      >
        <FaSearch className="header-search-icon" />
      </button>
    </div>
  )

  onClickSearch = () => {
    this.setState(prevState => ({isSearchClicked: !prevState.isSearchClicked}))
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {
            isSearchClicked,
            isMenuIconClicked,
            updateIsSearchClicked,
            updateIsMenuClicked,
          } = value

          const onClickSearch = () => {
            updateIsSearchClicked()
          }

          const onClickMenuIcon = () => {
            updateIsSearchClicked(false)
            updateIsMenuClicked()
          }

          const onClickCloseIcon = () => {
            updateIsMenuClicked()
          }

          const renderSearchHomeProfileLogout = () => {
            const {currentPathName} = this.state
            return (
              <div className="header-home-profile-logout-card">
                <Link
                  to="/"
                  className={`header-search-text-button ${
                    currentPathName === '/' && 'add-style'
                  }`}
                >
                  Home
                </Link>
                <button
                  onClick={onClickSearch}
                  className="header-search-text-button"
                  type="button"
                >
                  Search
                </button>
                <Link
                  to="/my-profile"
                  className={`header-search-text-button ${
                    currentPathName === '/my-profile' && 'add-style'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={this.onClickLogoutButton}
                  className="header-logout-button"
                  type="button"
                >
                  Logout
                </button>
                <button
                  aria-label="close icon"
                  onClick={onClickCloseIcon}
                  className="header-menu-close-icon-button"
                  type="button"
                >
                  <IoCloseCircle className="header-menu-close-icon" />
                </button>
              </div>
            )
          }

          return (
            <div className="header-container">
              <div className="header-website-logo-menu-card">
                <div className="header-insta-share-img-text-card">
                  <img
                    className="header-insta-share-img"
                    src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724140810/Standard_Collection_8_2x_rmjdky.png"
                    alt="website logo"
                  />
                  <p className="header-insta-share-text">Insta Share</p>
                </div>
                <button
                  aria-label="menu icon"
                  onClick={onClickMenuIcon}
                  type="button"
                  className="header-menu-button"
                >
                  <IoMenu className="header-menu-icon" />
                </button>
              </div>
              {isMenuIconClicked &&
                !isSearchClicked &&
                renderSearchHomeProfileLogout()}
              {isMenuIconClicked && isSearchClicked && (
                <div className="header-search-container">
                  {this.renderSearchCard()}
                </div>
              )}
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default withRouter(Header)
