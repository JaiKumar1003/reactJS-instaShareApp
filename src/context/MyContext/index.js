import React from 'react'

const MyContext = React.createContext({
  isSearchClicked: false,
  updateIsSearchClicked: () => {},
  isMenuIconClicked: false,
  updateIsMenuClicked: () => {},
  searchInput: '',
  updateSearchInput: () => {},
  isSearchButtonClicked: false,
  updateIsSearchButtonClicked: () => {},
  searchApiStatus: 'LOADING',
  updateSearchApiStatus: () => {},
})

export default MyContext
