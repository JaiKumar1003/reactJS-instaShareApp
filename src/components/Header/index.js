import {Component} from 'react'
import {withRouter} from 'react-router-dom'
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

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {
            isSearchClicked,
            isMenuIconClicked,
            updateIsSearchClicked,
            updateIsMenuClicked,
            searchInput,
            updateSearchInput,
            updateIsSearchButtonClicked,
            updateSearchApiStatus,
          } = value

          const onClickSearch = () => {
            updateIsSearchClicked()
          }

          const onClickMenuIcon = () => {
            updateIsSearchClicked(false)
            updateIsMenuClicked(true)
            updateSearchInput('')
          }

          const onClickCloseIcon = () => {
            updateIsMenuClicked(false)
          }

          const onClickSearchButton = () => {
            if (searchInput.length > 0) {
              updateIsSearchButtonClicked(true)
              updateSearchApiStatus('LOADING')
            }
          }

          const onChangeSearchInput = event => {
            updateSearchInput(event.target.value)
          }

          const renderSearchCard = () => (
            <div className="header-search-card">
              <input
                value={searchInput}
                onChange={onChangeSearchInput}
                className="header-search-input"
                type="search"
                placeholder="Search Caption"
              />
              <button
                onClick={onClickSearchButton}
                aria-label="search icon"
                type="button"
                className="header-search-button"
              >
                <FaSearch className="header-search-icon" />
              </button>
            </div>
          )

          const onClickProfileBtn = () => {
            const {history} = this.props
            history.push('/my-profile')
            updateIsSearchButtonClicked(false)
            updateSearchInput('')
          }

          const onClickHomeBtn = () => {
            const {history} = this.props
            history.push('/')
            updateIsSearchButtonClicked(false)
            updateIsMenuClicked(false)
            updateSearchInput('')
            updateIsSearchClicked(false)
          }

          const renderSearchHomeProfileLogout = () => {
            const {currentPathName} = this.state
            return (
              <div className="header-home-profile-logout-card">
                <button
                  type="button"
                  onClick={onClickHomeBtn}
                  className={`header-home-profile-btn ${
                    currentPathName === '/' && 'add-style'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={onClickSearch}
                  className="header-search-text-button"
                  type="button"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={onClickProfileBtn}
                  className={`header-home-profile-btn ${
                    currentPathName === '/my-profile' && 'add-style'
                  }`}
                >
                  Profile
                </button>
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
                  <button
                    className="header-logo-button"
                    type="button"
                    onClick={onClickHomeBtn}
                  >
                    <img
                      className="header-insta-share-img"
                      src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724140810/Standard_Collection_8_2x_rmjdky.png"
                      alt="website logo"
                    />
                  </button>
                  <p className="header-insta-share-text">Insta Share</p>
                </div>
                <div className="header-search-home-profile-logout-card-lg">
                  {renderSearchCard()}
                  {renderSearchHomeProfileLogout()}
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
                  {renderSearchCard()}
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
