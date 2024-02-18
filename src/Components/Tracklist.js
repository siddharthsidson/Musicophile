import React from 'react'
import '../Styles/Tracklist.css'
import Track from './Track'

export default class Tracklist extends React.Component {
  render() {
    const tracksFound=this.props.tracks||[]
    return (
      <div className='TrackList'>        
        {tracksFound.map(track => {
            return(
                <Track track={track} key={track.id} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />
        );
        })}
      </div>
    )
  }
}
