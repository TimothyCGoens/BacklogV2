import React from "react";
import Plate from "./Plate";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Dropdown, Card, Image, List, Button } from "semantic-ui-react";
// import moment from "moment";
import "semantic-ui-css/semantic.min.css";
// import Card from "./Card";
import {
  addBacklogGame,
  addWishlistGame,
  getBacklog,
  getWishlist,
  getCompleted,
} from "../redux/actions/actions";
import { connect } from "react-redux";
import rawg from "../apis/rawg";
import "./search.css";

const backlogArray = [];
const wishlistArray = [];
const completedArray = [];

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      gameTitle: "",
      gameId: null,
      games: [],
      selectedGame: "",
      title: "",
      image: "",
      releaseDate: "",
      platform: "",
      platforms: [],
      platformSelected: false,
      genres: [],
      stores: [],
      loading: false,
      screenshots: [],
      searchMessage: "",
      successMessage: "",
      backlogTitles: [],
      wishlistTitles: [],
      completedTitles: [],
    };
  }

  componentDidMount() {
    this.props.backlog.map((game) => backlogArray.push(game.gameId));
    this.props.wishlist.map((game) => wishlistArray.push(game.gameId));
    this.props.completed.map((game) => completedArray.push(game.gameId));
    console.log(this.props.userId);
  }

  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  resetGameSelection = () => {
    console.log("clicked");
    this.setState({
      selectedGame: "",
      searchMessage: "",
    });
  };

  handleAddToBacklog = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
      platform: this.state.platform,
    };
    if (this.props.userId === null) {
      this.setState({
        searchMessage: "Please log in to add game to your wishlist",
      });
    } else if (this.state.platformSelected === false) {
      this.setState({
        searchMessage: "Please select a platform",
      });
    } else if (backlogArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "This game is already in your backlog",
      });
    } else if (wishlistArray.includes(game.gameId)) {
      this.setState({
        seachMessage: "This game is already on your wishlist",
      });
    } else if (completedArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "You have already completed this game",
      });
    } else {
      this.props.addBacklogGame(game);
      this.setState({
        searchMessage: "Game added!",
      });
    }
  };

  handleAddToWishlist = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
      platform: this.state.platform,
    };
    if (this.props.userId === null) {
      this.setState({
        searchMessage: "Please log in to add game to your wishlist",
      });
    } else if (this.state.platformSelected === false) {
      this.setState({
        searchMessage: "Please select a platform",
      });
    } else if (backlogArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "This game is already in your backlog",
      });
    } else if (wishlistArray.includes(game.gameId)) {
      this.setState({
        seachMessage: "This game is already on your wishlist",
      });
    } else if (completedArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "You have already completed this game",
      });
    } else {
      this.props.addWishlistGame(game);
      this.setState({
        searchMessage: "Game added!",
      });
    }
  };

  onGameTitleInputChange = (e) => {
    this.setState({
      gameTitle: e.target.value,
    });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();

    const response = await rawg.get("/games", {
      params: {
        search: this.state.gameTitle,
      },
    });
    console.log(response.data.results);
    this.setState({
      games: response.data.results,
      loading: false,
    });
  };

  handlePlateSelection = async (index) => {
    const game = await this.state.games[index];
    this.setState({
      selectedGame: game,
      releaseDate: game.released,
      genres: game.genres,
      platforms: game.platforms,
      stores: game.stores,
      image: game.short_screenshots[0].image,
      screenshots: game.short_screenshots,
      gameId: game.id,
    });
  };

  handlePlatformSelection = ({ value }) => {
    this.setState({
      platform: value,
      platformSelected: true,
      searchMessage: "",
    });
  };

  renderPlate() {
    return this.state.games.map((game, index) => {
      if (
        game.short_screenshots === null ||
        game.short_screenshots.length === 0
      ) {
        return (
          <Plate
            key={game.id}
            // image={game.short_screenshots[0].image}
            name={game.name}
            clicked={() => this.handlePlateSelection(game.guid)}
          />
        );
      } else {
        return (
          <Plate
            key={game.id}
            image={game.short_screenshots[0].image}
            name={game.name}
            clicked={() => this.handlePlateSelection(index)}
          />
        );
      }
    });
  }

  renderDropdown() {
    const platformOptions = this.state.platforms.map((platform) => {
      return {
        key: platform.platform.name,
        text: platform.platform.name,
        value: platform.platform.name,
      };
    });
    return (
      <Dropdown
        className="ui search selection dropdown"
        placeholder="Platform"
        onChange={this.handlePlatformSelection}
        options={platformOptions}
      />
    );
  }

  renderCardList() {}

  // renderCard() {
  //   console.log(this.state.selectedGame);

  //   return (
  //     <Card
  //       name={this.state.selectedGame.name}
  //       platform={platforms}
  //       image={game.image}
  //     />
  //   );
  // }

  render() {
    const genres = this.state.genres.map((genre, index) => {
      if (this.state.genres === null || this.state.genres.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{genre.name}</p>;
      }
    });

    const platforms = this.state.platforms.map((platform) => {
      if (this.state.platforms === null || this.state.platforms.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{platform.platform.name}</p>;
      }
    });

    return (
      <div className="search">
        {!this.state.selectedGame ? (
          <div>
            <h1>Search</h1>
            <form onSubmit={this.onFormSubmit}>
              <div className="input-section">
                <label className="login-label">Search by Title</label>
                <input
                  value={this.state.gameTitle}
                  onChange={this.onGameTitleInputChange}
                  className="search-input"
                  name="gameTitle"
                  autoComplete="off"
                  type="text"
                />
                <button onClick={this.setLoading}>Search</button>
              </div>
            </form>
          </div>
        ) : null}

        {this.state.loading === true ? (
          <Loader
            type="ThreeDots"
            color="#789"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        ) : !this.state.selectedGame ? (
          <div className="search-results">{this.renderPlate()}</div>
        ) : this.state.selectedGame ? (
          <React.Fragment>
            <Card className="ui card">
              <Image
                className="image"
                src={this.state.selectedGame.short_screenshots[0].image}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{this.state.selectedGame.name}</Card.Header>
                <Card.Meta>{this.state.releaseDate}</Card.Meta>
                <Card.Description className="description-style">
                  <List horizontal>
                    <List.Item>
                      <Image
                        avatar
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1200px-Metacritic.svg.png"
                      />
                      <List.Content>
                        <List.Header>Score</List.Header>
                        {this.state.selectedGame.metacritic}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>Genres</List.Header>
                        {genres}
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="dropdown-section">{this.renderDropdown()}</div>
                <div className="ui three buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                  <Button onClick={this.resetGameSelection} basic color="blue">
                    Back
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    backlog: state.backlog,
    wishlist: state.wishlist,
    completed: state.completed,
  };
};

export default connect(mapStateToProps, {
  addBacklogGame,
  addWishlistGame,
  getBacklog,
  getWishlist,
  getCompleted,
})(Search);

// <Card
// name={this.state.selectedGame.name}
// platform={platforms}
// genre={genres}
// score={this.state.selectedGame.metacritic}
// image={this.state.selectedGame.short_screenshots[0].image}></Card>
// <div className="buttons">
// <Button
//   onClick={this.handleAddToBacklog}
//   content="Backlog"></Button>
// <Button
//   onClick={this.handleAddToWishlist}
//   content="Wishlist"></Button>
// <Button
//   onClick={this.resetGameSelection}
//   content="Collection"></Button>
// <Button onClick={this.resetGameSelection} content="Back"></Button>
// <p className="validation-error">{this.state.searchMessage}</p>
// </div>
