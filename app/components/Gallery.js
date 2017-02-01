import React, {Component, PropTypes} from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      audio: null,
      audioUrlPlaying: ''
    };
    this.displayTracks = this.displayTracks.bind(this);
  }

  //we use the built-in Audio object to create a new audio element with the url of the mp3
  playAudio(audioUrl) {
    let currentAudio = new Audio(audioUrl);
    //if there is no other audio being played, we start playing the selected audio
    if(this.state.playing === false) {
      //we use the built-in play function to play the audio
      currentAudio.play();
      //when the audio plays, we change the state accordingly
      this.setState({
        playing: true,
        audio: currentAudio,
        audioUrlPlaying: audioUrl
      });
      //if there is another audio playing
    } else {
      //if the audio being played is the one we select, we pause it
      if(this.state.audioUrlPlaying === audioUrl) {
        //we use the built-in pause function to pause the audio
        this.state.audio.pause();
        this.setState({
          playing: false
        });
        //if the audio being played is not the one we select, we pause the old and play the one selected
      } else {
        this.state.audio.pause();
        currentAudio.play();
        this.setState({
          audio: currentAudio,
          audioUrlPlaying: audioUrl
        });
      }
    }
  }

  displayTracks() {
    return this.props.tracks.map((track, index) => {
      return (
        <div onClick={() => this.playAudio(track.preview_url)} className="Track" key={index}>
          <img src={track.album.images[0].url} className="Track-image"></img>
          <p className="Track-name">{track.name}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Gallery">
        {this.displayTracks()}
      </div>
    );
  }
}

Gallery.propTypes = {
  tracks: PropTypes.array
};

export default Gallery;
