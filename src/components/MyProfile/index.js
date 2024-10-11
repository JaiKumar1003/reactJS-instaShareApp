import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

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

class MyProfile extends Component {
  state = {myProfileData: {}, myProfileApiStatus: statusObject.loading}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {profile} = data
      const updatedData = {
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        id: profile.id,
        posts: profile.posts,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        stories: profile.stories,
        userId: profile.user_id,
        userName: profile.user_name,
        userBio: profile.user_bio,
      }
      this.setState({
        myProfileData: updatedData,
        myProfileApiStatus: statusObject.success,
      })
    } else {
      this.setState({myProfileApiStatus: statusObject.failure})
    }
  }

  onClickTryAgainBtn = () => {
    this.setState(
      {myProfileApiStatus: statusObject.loading},
      this.getMyProfileData,
    )
  }

  renderLoader = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={54} width={54} />
    </div>
  )

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {isSearchClicked, isSearchButtonClicked} = value
          const {myProfileApiStatus} = this.state

          const renderUserNameBioImage = () => {
            const {myProfileData} = this.state
            const {
              followersCount,
              followingCount,
              userBio,
              userId,
              userName,
              postsCount,
              profilePic,
            } = myProfileData

            return (
              <div className="profile-user-id-name-image-bio-card">
                <p className="profile-user-name">{userName}</p>
                <div className="profile-image-post-followers-following-count-card">
                  <img
                    className="profile-image"
                    src={profilePic}
                    alt="my profile"
                  />
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
                </div>
                <div className="profile-user-id-bio-card">
                  <p className="profile-user-id">{userId}</p>
                  <p className="profile-user-bio">{userBio}</p>
                </div>
              </div>
            )
          }

          const renderUserStory = () => {
            const {myProfileData} = this.state
            const {stories} = myProfileData

            return (
              <>
                {stories.length !== 0 && (
                  <ul className="profile-user-stories-list">
                    {stories.map(eachStory => (
                      <li
                        className="profile-user-stories-item"
                        key={eachStory.id}
                      >
                        <img
                          className="profile-user-stories-image"
                          src={eachStory.image}
                          alt="my story"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )
          }

          const renderUserPost = () => {
            const {myProfileData} = this.state
            const {posts} = myProfileData

            return (
              <div className="profile-post-image-icon-card">
                <div className="profile-post-name-icon-card">
                  <BsGrid3X3 className="profile-post-icon" />
                  <p className="profile-post-text">Posts</p>
                </div>
                {posts.length === 0 ? (
                  <div className="profile-no-post-card">
                    <div className="profile-no-post-icon-card">
                      <BiCamera className="profile-no-post-icon" />
                    </div>
                    <p className="profile-no-post-text">No Posts Yet</p>
                  </div>
                ) : (
                  <ul className="profile-post-list">
                    {posts.map(eachPost => (
                      <li className="profile-post-item" key={eachPost.id}>
                        <img
                          className="profile-post-image"
                          src={eachPost.image}
                          alt="my post"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          }

          const renderSuccessView = () => {
            const {myProfileData} = this.state
            const {stories} = myProfileData

            return (
              <div className="profile-card">
                {renderUserNameBioImage()}
                {renderUserStory()}
                <hr
                  style={{marginTop: `${stories.length === 0 && '20px'}`}}
                  className="user-profile-horizontal-line"
                />
                {renderUserPost()}
              </div>
            )
          }

          const renderFailureView = () => (
            <div className="profile-failure-card">
              <img
                className="profile-failure-image"
                src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724481566/alert-triangle_4x_klflni.png"
                alt="failure view"
              />
              <p className="profile-failure-text">
                Something went wrong. Please try again
              </p>
              <button
                onClick={this.onClickTryAgainBtn}
                className="profile-failure-try-again-button"
                type="button"
              >
                Try again
              </button>
            </div>
          )

          const renderSuccessFailureView = () => {
            if (myProfileApiStatus === statusObject.success) {
              return renderSuccessView()
            }

            return renderFailureView()
          }

          const renderMyProfileApiStatus = () => {
            if (myProfileApiStatus === statusObject.loading) {
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

export default MyProfile
