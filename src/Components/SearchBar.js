import React from 'react'
import '../Styles/SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         term:""
      }

      this.handleTermChange = this.handleTermChange.bind(this);
      
    }

    handleTermChange = (event) => {
        this.setState({term: event.target.value});
    }

    search = () => {
        this.props.onSearch(this.state.term)
    }

    handleEnter = (event) => {
        if(event.keyCode === 13){
            this.search()
        }
    }

  render() {
    return (
      <div className='SearchBar'>
        <input placeholder='Enter song, album or artist' onChange={this.handleTermChange} onKeyUp={this.handleEnter}/>
        <button className='SearchButton' onClick={this.search}>Search</button>
      </div>
    )
  }
}

export default SearchBar
