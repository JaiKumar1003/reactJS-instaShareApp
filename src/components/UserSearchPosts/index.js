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
  const {searchInput, searchApiStatus, updateSearchApiStatus} =
    useContext(MyContext)

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

  const renderSearchResult = () => (
    <>
      <div className="search-result-text-card">
        <h1 className="search-result-text">Search Results</h1>
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

  const renderSearchNotFound = () => (
    <div className="search-post-not-found-card">
      <img
        className="search-post-not-found-image"
        src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724483857/Group_20x_1_zxrq5h.png"
        alt="search not found"
      />
      <h1 className="search-post-not-found-text">Search Not Found</h1>
      <p className="search-post-not-found-desp">
        Try different keyword or search again
      </p>
    </div>
  )

  const renderSuccessView = () => {
    if (searchPostList.length === 0) {
      return renderSearchNotFound()
    }

    return renderSearchResult()
  }

  const onClickTryAgainBtn = () => {
    updateSearchApiStatus(statusObject.loading)
  }

  const renderFailureView = () => (
    <div className="search-post-failure-card">
      <img
        className="search-post-failure-image"
        src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724482675/Group_7522_10x_likiih.png"
        alt="failure view"
      />
      <p className="search-post-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={onClickTryAgainBtn}
        className="search-post-failure-try-again-button"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  const renderStoryApiStatus = () => {
    if (searchApiStatus === statusObject.success) {
      return renderSuccessView()
    }

    return renderFailureView()
  }

  const renderLoader = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={54} width={54} />
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
