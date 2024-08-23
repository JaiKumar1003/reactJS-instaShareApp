import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import MyContext from './context/MyContext'

import './App.css'

const statusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    isSearchClicked: false,
    isMenuIconClicked: false,
    searchInput: '',
    isSearchButtonClicked: false,
    searchApiStatus: statusObject.loading,
  }

  updateSearchApiStatus = value => {
    this.setState({searchApiStatus: value})
  }

  updateIsSearchClicked = value => {
    if (value === false) {
      this.setState({isSearchClicked: false})
    } else {
      this.setState(prevState => ({
        isSearchClicked: !prevState.isSearchClicked,
      }))
    }
  }

  updateIsMenuClicked = value => {
    if (value === false) {
      this.setState({isMenuIconClicked: false})
    } else {
      this.setState(prevState => ({
        isMenuIconClicked: !prevState.isMenuIconClicked,
      }))
    }
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  updateIsSearchButtonClicked = value => {
    this.setState({
      isSearchButtonClicked: value,
    })
  }

  render() {
    const {
      isSearchClicked,
      isMenuIconClicked,
      searchInput,
      isSearchButtonClicked,
      searchApiStatus,
    } = this.state
    return (
      <MyContext.Provider
        value={{
          isSearchClicked,
          updateIsSearchClicked: this.updateIsSearchClicked,
          isMenuIconClicked,
          updateIsMenuClicked: this.updateIsMenuClicked,
          searchInput,
          updateSearchInput: this.updateSearchInput,
          isSearchButtonClicked,
          updateIsSearchButtonClicked: this.updateIsSearchButtonClicked,
          searchApiStatus,
          updateSearchApiStatus: this.updateSearchApiStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/my-profile" component={MyProfile} />
          <Route exact path="/users/:id" component={UserProfile} />
        </Switch>
      </MyContext.Provider>
    )
  }
}

export default App
