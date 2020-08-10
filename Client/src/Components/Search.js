import React, { useState } from "react";
import Plate from "./Plate";
import axios from "axios";
import moment from "moment";
import Card from "./Card";
import Button from "./Button";
import { connect } from "react-redux";
import "./search.css";

// const Search = () => {
//   const [data, setData] = useState([]);
//   const [query, setQuery] = useState("");
//   // const [search, setSearch] = useState();
//   const [selectedGame, setSelectedGame] = useState("");

//   return (
//     <div className="search">
//       <div className="input-section">
//         <label className='search-label'>Enter Game Title</label>
//         <input
//           className='search-input'
//           type="text"
//           value={query}
//           onChange={(event) => setQuery(event.target.value)}
//         />
//       </div>

//       <button type="button" onClick={gameSearch}>
//         Search
//       </button>

// {!selectedGame ? (
//   <div className="search-results">
//     {data.map((game) => {
//       return (
//         <Plate
//           key={game.id}
//           name={game.name}
//           image={game.image.medium_url}
//           releaseDate={moment(game.original_release_date).format(
//             "MMMM Do, YYYY"
//           )}
//           clicked={() => handlePlateSelection(game.guid)}
//         />
//       );
//     })}
//   </div>
//       ) : selectedGame ? (

//       ) : null}
//     </div>
//   );
// };

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      gameTitle: "",
      games: [],
      selectedGame: "",
    };
  }

  resetGameSelection = () => {
    this.setState({
      selectedGame: "",
    });
  };

  handleButtonClick = () => {
    console.log("clicked");
  };

  onGameTitleInputChange = (e) => {
    this.setState({
      gameTitle: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/search/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=json&query="${
          this.state.gameTitle
        }"&resources=game`,
        { crossdomain: true }
      )
      .then((response) => {
        this.setState({
          games: response.data.results,
        });
        console.log(this.state.games);
      });
  };

  handlePlateSelection = async (id) => {
    await axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/game/${id}/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=JSON`,
        { crossdomain: true }
      )
      .then((response) => {
        this.setState({
          selectedGame: response.data.results,
        });
        console.log(this.state.selectedGame);
      });
  };

  renderPlate() {
    return this.state.games.map((game) => {
      return (
        <Plate
          key={game.id}
          name={game.name}
          image={game.image.medium_url}
          releaseDate={moment(game.original_release_date).format(
            "MMMM Do, YYYY"
          )}
          clicked={() => this.handlePlateSelection(game.guid)}
        />
      );
    });
  }

  renderCard() {
    return (
      <div className="search-results">
        <div className="card-display">
          <Card
            key={this.state.selectedGame.id}
            name={this.state.selectedGame.name}
            image={this.state.selectedGame.image.medium_url}
            developer={this.state.selectedGame.developers[0].name}
            publisher={this.state.selectedGame.publishers[0].name}
            platform={this.state.selectedGame.platforms[0].name}
            genre={this.state.selectedGame.genres[0].name}
            description={this.state.selectedGame.deck}
          />
        </div>
        <div className="card-buttons">
          <Button
            label="Add to Backlog"
            className="card-backlog-button"
            clicked={this.handleButtonClick}
          />
          <Button
            label="Back"
            className="card-backlog-button"
            clicked={this.resetGameSelection}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="search">
        <h1>Search</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="input-section">
            <label className="login-label">Search by Title</label>
            <input
              value={this.state.gameTitle}
              onChange={this.onGameTitleInputChange}
              className="login-input"
              name="gameTitle"
              autoComplete="off"
              type="text"
            />
            <button>Search</button>
            {!this.state.selectedGame
              ? this.renderPlate()
              : this.state.selectedGame
              ? this.renderCard()
              : null}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Search);
