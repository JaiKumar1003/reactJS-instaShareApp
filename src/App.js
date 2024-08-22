import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import UserStories from './components/UserStories'
import MyProfile from './components/MyProfile'
import MyContext from './context/MyContext'

import './App.css'

class App extends Component {
  state = {isSearchClicked: false, isMenuIconClicked: false}

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

  render() {
    const {isSearchClicked, isMenuIconClicked} = this.state
    return (
      <MyContext.Provider
        value={{
          isSearchClicked,
          updateIsSearchClicked: this.updateIsSearchClicked,
          isMenuIconClicked,
          updateIsMenuClicked: this.updateIsMenuClicked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/my-profile" component={MyProfile} />
        </Switch>
      </MyContext.Provider>
    )
  }
}

export default App
