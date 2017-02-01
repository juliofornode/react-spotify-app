import React, {Component, PropTypes} from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.displayGenres = this.displayGenres.bind(this);
  }

  displayGenres() {
    return this.props.artist.genres.map((genre,index) => {
      genre = (index === (this.props.artist.genres.length - 1)) ? `${genre}` : `${genre}, `;
      return (<span key={index}>{genre}</span>);
    });
  }

  render() {
    let toDisplay = '';
    if(this.props.artist !== null) {
      toDisplay = (
        <div className="Profile">
          <img className="Profile-img" src={this.props.artist.images[0].url}></img>
          <div className="Profile-info">
            <div className="Profile-name">{this.props.artist.name}</div>
            <div className="Profile-genres">{this.displayGenres()}</div>
          </div>
        </div>
      );
    }
    return(
      <div>
        {toDisplay}
      </div>
    );
  }
}

Profile.propTypes = {
  artist: PropTypes.object
};

export default Profile;
