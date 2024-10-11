import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickHomeButton = () => {
    history.push('/')
  }

  return (
    <div className="page-not-found-container">
      <div className="page-not-found-card">
        <img
          className="page-not-found-image"
          src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724487510/erroring_1_10x_fwgxnf.png"
          alt="page not found"
        />
        <h1 className="page-not-found-heading">Page Not Found</h1>
        <p className="page-not-found-desp">
          we are sorry, the page you requested could not be found.
          <br />
          <span>Please go back to the homepage.</span>
        </p>
        <button
          onClick={onClickHomeButton}
          type="button"
          className="page-not-found-button"
        >
          Home Page
        </button>
      </div>
    </div>
  )
}

export default NotFound
