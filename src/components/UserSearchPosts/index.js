import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UserPostItem from '../UserPostItem'
import MyContext from '../../context/MyContext'

import './index.css'

const statusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UserSearchPosts = () => {
  const {searchInput, searchApiStatus, updateSearchApiStatus} = useContext(
    MyContext,
  )

  const [searchPostList, setSearchPostList] = useState([])

  const initiateLikeApi = async (postId, likeStatus) => {
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
      const updatedData = searchPostList.map(eachItem => {
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
      setSearchPostList(updatedData)
    }
  }

  const renderSuccessView = () => (
    <>
      <div className="search-result-text-card">
        <p className="search-result-text">Search Results</p>
      </div>
      <ul className="user-post-list">
        {searchPostList.map(eachItem => (
          <li className="user-post-item" key={eachItem.postId}>
            <UserPostItem
              initiateLikeApi={initiateLikeApi}
              postItem={eachItem}
            />
          </li>
        ))}
      </ul>
    </>
  )

  const renderFailureView = () => <div>Story Failure</div>

  const renderStoryApiStatus = () => {
    if (searchApiStatus === statusObject.success) {
      return renderSuccessView()
    }

    return renderFailureView()
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={34} width={34} />
    </div>
  )

  useEffect(() => {
    const getPosts = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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
        setSearchPostList(updatedData)
        updateSearchApiStatus(statusObject.success)
      } else {
        updateSearchApiStatus(statusObject.failure)
      }
    }

    getPosts()
  }, [searchApiStatus])

  return (
    <div className="user-post-container">
      {searchApiStatus === statusObject.loading
        ? renderLoader()
        : renderStoryApiStatus()}
    </div>
  )
}

export default UserSearchPosts
