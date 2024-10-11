import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import UserSearchPosts from '../UserSearchPosts'
import UserSearchPage from '../UserSearchPage'
import MyContext from '../../context/MyContext'

import './index.css'

class Home extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {isMenuIconClicked, isSearchClicked, isSearchButtonClicked} =
            value

          return (
            <div className="home-container">
              <Header />
              {!isSearchButtonClicked && isSearchClicked && <UserSearchPage />}
              {!isSearchClicked &&
                !isMenuIconClicked &&
                !isSearchButtonClicked && (
                  <>
                    <UserStories />
                    <hr className="home-horizontal-line" />
                  </>
                )}
              {!isSearchClicked && !isSearchButtonClicked && <UserPosts />}
              {isSearchButtonClicked && <UserSearchPosts />}
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Home
