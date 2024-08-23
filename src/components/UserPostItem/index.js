import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

const UserPostItem = props => {
  const {postItem, initiateLikeApi} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userName,
    message,
    userId,
  } = postItem
  const isLiked = message === 'Post has been liked'
  const postImg = postDetails.image_url
  const {caption} = postDetails

  const renderUserNamePostImg = () => (
    <>
      <div className="post-item-user-img-name-card">
        <img
          className="post-item-user-img"
          src={profilePic}
          alt="user profile"
        />
        <Link className="link-el" to={`/users/${userId}`}>
          <p className="post-item-user-name">{userName}</p>
        </Link>
      </div>
      <div className="post-item-user-post-img-card">
        <img className="post-item-user-post-img" src={postImg} alt="post" />
      </div>
    </>
  )

  const onClickLikedButton = () => {
    initiateLikeApi(postId, false)
  }

  const onClickUnlikeButton = () => {
    initiateLikeApi(postId, true)
  }

  const renderPostLikeCommentShareIcon = () => (
    <div className="post-item-icons-card">
      {isLiked ? (
        <button
          type="button"
          aria-label="liked icon"
          onClick={onClickLikedButton}
          className="post-item-icons-button"
        >
          <FcLike className="post-item-icons" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="like icon"
          onClick={onClickUnlikeButton}
          className="post-item-icons-button"
        >
          <BsHeart className="post-item-icons" />
        </button>
      )}
      <button
        type="button"
        aria-label="comment icon"
        className="post-item-icons-button"
      >
        <FaRegComment className="post-item-icons" />
      </button>
      <button
        type="button"
        aria-label="share icon"
        className="post-item-icons-button"
      >
        <BiShareAlt className="post-item-icons" />
      </button>
    </div>
  )

  const renderUserPostComment = () => {
    const updatedComments = comments.map(eachItem => ({
      comment: eachItem.comment,
      commentUserId: eachItem.user_id,
      commentUserName: eachItem.user_name,
    }))

    return (
      <ul className="post-item-comment-list">
        {updatedComments.map(eachComment => {
          const {comment, commentUserId, commentUserName} = eachComment

          return (
            <li className="post-item-comment" key={commentUserId}>
              <p className="post-comment-user-name">
                <Link to={`/users/${commentUserId}`} className="link-el">
                  {commentUserName}
                </Link>
                <span className="post-comment">{` ${comment}`}</span>
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderPostCaptionComment = () => (
    <div className="post-item-caption-comments-card">
      {renderPostLikeCommentShareIcon()}
      <p className="post-item-likes-count-text">{`${likesCount} likes`}</p>
      <p className="post-item-caption-text">{caption}</p>
      {renderUserPostComment()}
      <p className="post-item-created-at">{createdAt}</p>
    </div>
  )

  return (
    <div className="user-post-item-container">
      {renderUserNamePostImg()}
      {renderPostCaptionComment()}
    </div>
  )
}

export default UserPostItem
