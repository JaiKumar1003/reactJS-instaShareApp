import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const statusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {
    storiesList: [],
    storyApiStatus: statusObject.loading,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const storiesList = data.users_stories
      const updatedStoriesList = storiesList.map(eachItem => ({
        storyUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        storiesList: updatedStoriesList,
        storyApiStatus: statusObject.success,
      })
    } else {
      this.setState({storyApiStatus: statusObject.failure})
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {storiesList.map(eachLogo => {
            const {storyUrl, userId, userName} = eachLogo
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="company logo" />
                <p className="story-user-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => <div>Story Failure</div>

  renderStoryApiStatus = () => {
    const {storyApiStatus} = this.state

    if (storyApiStatus === statusObject.success) {
      return this.renderSuccessView()
    }

    return this.renderFailureView()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={34} width={34} />
    </div>
  )

  render() {
    const {storyApiStatus} = this.state
    return (
      <div className="main-container">
        {storyApiStatus === statusObject.loading
          ? this.renderLoader()
          : this.renderStoryApiStatus()}
      </div>
    )
  }
}

export default ReactSlick
