import React from 'react'
import '../Styles/SearchResults.css'
import Tracklist from './Tracklist'

export default class SearchResults extends React.Component {
  render() {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    )
  }
}
