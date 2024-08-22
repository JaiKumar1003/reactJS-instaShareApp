import React from 'react'

const MyContext = React.createContext({
  isSearchClicked: false,
  updateIsSearchClicked: () => {},
  isMenuIconClicked: false,
  updateIsMenuClicked: () => {},
})

export default MyContext
