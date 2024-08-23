import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UserPostItem from '../UserPostItem'

import './index.css'

const statusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserPosts extends Component {
  state = {
    postList: [],
    postApiStatus: statusObject.loading,
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {posts} = data
      const updatedData = posts.map(eachItem => ({
        comments: eachItem.comments,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        postDetails: eachItem.post_details,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        message: 'Post has been disliked',
      }))
      this.setState({
        postList: updatedData,
        postApiStatus: statusObject.success,
      })
    } else {
      this.setState({postApiStatus: statusObject.failure})
    }
  }

  initiateLikeApi = async (postId, likeStatus) => {
    const {postList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likeStatus}),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {message} = data
      const updatedData = postList.map(eachItem => {
        if (eachItem.postId === postId && likeStatus) {
          return {
            ...eachItem,
            message,
            likesCount: eachItem.likesCount + 1,
          }
        }
        if (eachItem.postId === postId && !likeStatus) {
          return {
            ...eachItem,
            message,
            likesCount: eachItem.likesCount - 1,
          }
        }

        return eachItem
      })
      this.setState({
        postList: updatedData,
      })
    }
  }

  renderSuccessView = () => {
    const {postList} = this.state
    return (
      <ul className="user-post-list">
        {postList.map(eachItem => (
          <li className="user-post-item" key={eachItem.postId}>
            <UserPostItem
              initiateLikeApi={this.initiateLikeApi}
              postItem={eachItem}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => <div>Story Failure</div>

  renderStoryApiStatus = () => {
    const {postApiStatus} = this.state

    if (postApiStatus === statusObject.success) {
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
    const {postApiStatus} = this.state
    return (
      <div className="user-post-container">
        {postApiStatus === statusObject.loading
          ? this.renderLoader()
          : this.renderStoryApiStatus()}
      </div>
    )
  }
}

export default UserPosts
