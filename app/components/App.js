import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(eventObject) {
    this.setState({ query: eventObject.target.value });
  }

  handleKeyPress(eventObject) {
    if(eventObject.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch() {
    const self = this;
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = BASE_URL + '?q=' + this.state.query + '&type=artist&limit=1';

    //fetch is a new ES6 function. It returns a promise
    //good post about it: https://davidwalsh.name/fetch
    fetch(FETCH_URL, {
      method: 'GET'
    }).then(function(response) {
      //the resulting callback data has a json method for converting the raw data to a JavaScript object
      return response.json();
    }).then(function(jsonObject) {
      const artist = jsonObject.artists.items[0];
      self.setState({ artist: artist });
      self.setState({ query: ''});
      const ARTIST_URL = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=US&`;
      //once we have the artist id, we make a new request to get his top tracks
      fetch(ARTIST_URL, {
        method: 'GET'
      }).then(function(response) {
        return response.json();
      }).then(function(jsonObject) {
        self.setState({ tracks: jsonObject.tracks });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Searcher</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              value={this.state.query}
              type="text"
              placeholder="Enter Artist Name"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              >
            </FormControl>
            <InputGroup.Addon onClick={this.handleSearch}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="Profile">
          <Profile artist={this.state.artist} />
        </div>
        <div className="Gallery">
          <Gallery tracks={this.state.tracks}/>
        </div>
      </div>
    );
  }
}

export default App;
