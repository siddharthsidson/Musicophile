import React from 'react'
import '../Styles/Playlist.css'
import Tracklist from './Tracklist'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange = (event) =>{
        this.props.onNameChange(event.target.value);
    }
  render() {
    return (
      <div className='PlayList'>
        <input onChange={this.handleNameChange} value={this.props.PlaylistName} />
        <Tracklist tracks ={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
        <button className='PlayList-save' onClick={this.props.onSave} >Save to Spotify</button>
      </div>
    )
  }
}
