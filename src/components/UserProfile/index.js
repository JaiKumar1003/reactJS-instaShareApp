import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'
import UserSearchPosts from '../UserSearchPosts'
import UserSearchPage from '../UserSearchPage'
import MyContext from '../../context/MyContext'

import './index.css'

const statusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userProfileData: {}, userProfileApiStatus: statusObject.loading}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const userDetails = data.user_details
      const updatedData = {
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        id: userDetails.id,
        posts: userDetails.posts,
        postsCount: userDetails.posts_count,
        profilePic: userDetails.profile_pic,
        stories: userDetails.stories,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        userBio: userDetails.user_bio,
      }
      this.setState({
        userProfileData: updatedData,
        userProfileApiStatus: statusObject.success,
      })
    } else {
      this.setState({userProfileApiStatus: statusObject.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={34} width={34} />
    </div>
  )

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {
            isSearchClicked,
            isSearchButtonClicked,
            updateIsSearchButtonClicked,
          } = value
          const {userProfileApiStatus} = this.state

          const renderUserNameBioImage = () => {
            const {userProfileData} = this.state
            const {
              followersCount,
              followingCount,
              userBio,
              userId,
              userName,
              postsCount,
              profilePic,
            } = userProfileData
            return (
              <div className="profile-user-id-name-image-bio-card">
                <p className="profile-user-name">{userName}</p>
                <div className="profile-image-post-followers-following-count-card">
                  <img
                    className="profile-image"
                    src={profilePic}
                    alt="profile"
                  />
                  <div>
                    <p className="profile-user-name-lg">{userName}</p>
                    <div className="profile-post-followers-following-count-card">
                      <p className="profile-post-followers-following-text">
                        {postsCount}
                        <span className="profile-post-followers-following-span">
                          posts
                        </span>
                      </p>
                      <p className="profile-post-followers-following-text">
                        {followersCount}
                        <span className="profile-post-followers-following-span">
                          followers
                        </span>
                      </p>
                      <p className="profile-post-followers-following-text">
                        {followingCount}
                        <span className="profile-post-followers-following-span">
                          following
                        </span>
                      </p>
                    </div>
                    <div className="profile-user-id-bio-card-lg">
                      <p className="profile-user-id-lg">{userId}</p>
                      <p className="profile-user-bio-lg">{userBio}</p>
                    </div>
                  </div>
                </div>
                <div className="profile-user-id-bio-card">
                  <p className="profile-user-id">{userId}</p>
                  <p className="profile-user-bio">{userBio}</p>
                </div>
              </div>
            )
          }

          const renderUserStory = () => {
            const {userProfileData} = this.state
            const {stories} = userProfileData

            return (
              <ul className="profile-user-stories-list">
                {stories.map(eachStory => (
                  <li className="profile-user-stories-item" key={eachStory.id}>
                    <img
                      className="profile-user-stories-image"
                      src={eachStory.image}
                      alt="user story"
                    />
                  </li>
                ))}
              </ul>
            )
          }

          const renderUserPost = () => {
            const {userProfileData} = this.state
            const {posts} = userProfileData

            return (
              <div className="profile-post-image-icon-card">
                <div className="profile-post-name-icon-card">
                  <BsGrid3X3 className="profile-post-icon" />
                  <p className="profile-post-text">Posts</p>
                </div>
                <ul className="profile-post-list">
                  {posts.map(eachPost => (
                    <li className="profile-post-item" key={eachPost.id}>
                      <img
                        className="profile-post-image"
                        src={eachPost.image}
                        alt="user post"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          const renderSuccessView = () => (
            <div className="profile-card">
              {renderUserNameBioImage()}
              {renderUserStory()}
              <hr className="user-profile-horizontal-line" />
              {renderUserPost()}
            </div>
          )

          const renderFailureView = () => <div>Story Failure</div>

          const renderSuccessFailureView = () => {
            if (userProfileApiStatus === statusObject.success) {
              return renderSuccessView()
            }

            return renderFailureView()
          }

          const renderMyProfileApiStatus = () => {
            if (userProfileApiStatus === statusObject.loading) {
              return this.renderLoader()
            }

            return renderSuccessFailureView()
          }

          return (
            <div className="profile-container">
              <Header />
              {isSearchClicked && !isSearchButtonClicked && <UserSearchPage />}
              {isSearchButtonClicked && <UserSearchPosts />}
              {!isSearchClicked &&
                !isSearchButtonClicked &&
                renderMyProfileApiStatus()}
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default UserProfile
