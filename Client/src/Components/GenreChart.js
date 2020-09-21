import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, getGenres } from "../redux/actions/actions";

let genreCounts = [];

class GenreChart extends Component {
  constructor() {
    super();
    this.state = {
      sortedGenreArray: [],
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getGenres(this.props.userId);

    let genres = this.props.genres;
    let counts = this.props.genreGamesCount;

    genreCounts = genres.map(function (item, index) {
      return {
        genre: item.genre,
        games: counts[index].count,
      };
    });

    let sortedGenres = genreCounts.sort(function (a, b) {
      let gamesA = a.games;
      let gamesB = b.games;

      return gamesB - gamesA;
    });
    this.setState({
      sortedGenreArray: sortedGenres,
    });
  }
  render() {
    console.log(this.state.sortedGenreArray);
    return (
      <div>
        <h1>Genres</h1>
        <p>radar chart</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    user: state.user,
    genres: state.genres,
    genreGamesCount: state.genreGamesCount,
  };
};
export default connect(mapStateToProps, { getUser, getGenres })(GenreChart);
