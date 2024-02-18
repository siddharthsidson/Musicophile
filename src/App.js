import React from "react";
import "./App.css";
import Playlist from "./Components/Playlist";
import SearchBar from "./Components/SearchBar";
import SearchResults from "./Components/SearchResults";
import Spotify from "./Utils/Spotify";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      PlaylistName: "New Playlist",
      playlistTracks: [],
      SearchTerm: ""
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {      
      this.setState({ SearchResults: SearchResults });
    });
    this.setState({ SearchTerm: term });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(playlistname) {
    this.setState({ PlaylistName: playlistname });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(() => {
      this.setState({
        PlaylistName: "New Playlist",
        playlistTracks: [],
      });
    });
    this.search(this.state.SearchTerm);
  }

  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }
  
  render() {
    return (
      <div className="App">
        <h1>
          <a href="http://localhost:3000/">Musicophile</a>
        </h1>
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.SearchResults}
            onAdd={this.doThese}
          />
          <Playlist
            PlaylistName={this.state.PlaylistName}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
