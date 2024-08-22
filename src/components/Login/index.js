import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  getUserData = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({errorMsg: ''})
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getUserData()
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {username, password, errorMsg} = this.state

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-image-form-card">
          <div className="login-image-card">
            <img
              className="login-image"
              src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724072122/Illustration_2x_bxptc9.png"
              alt="website login"
            />
          </div>
          <div className="login-insta-share-img-form-card">
            <img
              className="login-insta-share-img"
              src="https://res.cloudinary.com/dojcy1a17/image/upload/v1724140810/Standard_Collection_8_2x_rmjdky.png"
              alt="website logo"
            />
            <p className="login-insta-share-text">Insta Share</p>
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <label htmlFor="username" className="login-form-label">
                USERNAME
              </label>
              <input
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                className="login-form-input"
                type="text"
                placeholder="Enter Username"
              />
              <label htmlFor="password" className="login-form-label">
                PASSWORD
              </label>
              <input
                id="password"
                value={password}
                onChange={this.onChangePassword}
                className="login-form-input"
                type="password"
                placeholder="Enter Password"
              />
              {errorMsg.length !== 0 && (
                <p className="login-error-msg">{errorMsg}</p>
              )}
              <button type="submit" className="login-form-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
