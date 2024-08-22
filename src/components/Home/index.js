import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import MyContext from '../../context/MyContext'

import './index.css'

class Home extends Component {
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={34} width={34} />
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <MyContext.Consumer>
        {value => {
          const {isMenuIconClicked} = value
          return (
            <div className="home-container">
              <Header />
              {!isMenuIconClicked && (
                <>
                  <UserStories />
                  <hr className="home-horizontal-line" />
                </>
              )}
              <UserPosts />
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Home
