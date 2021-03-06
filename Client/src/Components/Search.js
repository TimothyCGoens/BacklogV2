import React from "react";
import { v4 as uuidv4 } from "uuid";
// import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  Dropdown,
  Card,
  Image,
  List,
  Button,
  Dimmer,
  Loader,
  Popup,
  Input,
  Container,
} from "semantic-ui-react";
import ReadMoreReact from "read-more-react";
import moment from "moment";
import "semantic-ui-css/semantic.min.css";
// import Card from "./Card";
import {
  addBacklogGame,
  addWishlistGame,
  getBacklog,
  getWishlist,
  getCompleted,
  addToFeed,
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
      backlogTitles: [],
      completedTitles: [],
      description: "",
      developers: [],
      gameTitle: "",
      gameId: null,
      games: [],
      genres: [],
      image: "",
      loading: false,
      releaseDate: "",
      platform: "",
      platforms: [],
      platformSelected: false,
      publishers: [],
      screenshots: [],
      searchMessage: "",
      selectedGame: "",
      successMessage: "",
      title: "",
      wishlistTitles: [],
    };
  }

  componentDidMount() {
    this.props.backlog.map((game) => backlogArray.push(game.gameId));
    this.props.wishlist.map((game) => wishlistArray.push(game.gameId));
    this.props.completed.map((game) => completedArray.push(game.gameId));
  }
  //sets the state to loading on click of search button
  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  //when you click the BACK button, it resets state for selectedGame and searchMessage
  resetGameSelection = () => {
    this.setState({
      selectedGame: "",
      searchMessage: "",
    });
  };

  //runs the gameId through a series of checks to see if the user is logged in, if a platform is selected, and then if that game already exists in their table somewhere, if it passes all those checks it will get added to the appropriate table
  handleAddToBacklog = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
      platform: this.state.platform,
      releaseDate: this.state.releaseDate,
      genre: this.state.genres[0].name,
      backlog: true,
      wishlist: false,
      playing: false,
      completed: false,
    };
    const feedGame = {
      action: "added",
      userId: this.props.userId,
      title: this.state.selectedGame.name,
      destination: "Backlog",
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
      this.props.addToFeed(feedGame);
      // this.countPlatform(game);
      this.setState({
        searchMessage: "Game added!",
      });
    }
  };
  //runs the gameId through a series of checks to see if the user is logged in, if a platform is selected, and then if that game already exists in their table somewhere, if it passes all those checks it will get added to the appropriate table
  handleAddToWishlist = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
      platform: this.state.platform,
      releaseDate: this.state.releaseDate,
      genre: this.state.genres[0].name,
      wishlist: true,
    };
    const feedGame = {
      action: "added",
      userId: this.props.userId,
      title: this.state.selectedGame.name,
      destination: "Wishlist",
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
      this.props.addToFeed(feedGame);
      this.setState({
        searchMessage: "Game added!",
      });
    }
  };

  //gets the value of the search input
  onGameTitleInputChange = (e) => {
    this.setState({
      gameTitle: e.target.value,
    });
  };

  //first call based on the title they are searching for
  onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await rawg.get("/games", {
      params: {
        search: this.state.gameTitle,
        game_pk: this.state.gameTitle,
      },
    });
    this.setState({
      games: response.data.results,
      loading: false,
    });
  };
  //user clicks on the plate and another call is made so that we can get more details about the game
  handlePlateSelection = async (index) => {
    const game = await this.state.games[index];
    this.setState({
      loading: true,
      selectedGame: game,
      releaseDate: game.released,
      metacritic: game.metacritic,
      genres: game.genres,
      platforms: game.platforms,
      image: game.short_screenshots[0].image,
      screenshots: game.short_screenshots,
      gameId: game.id,
    });
    rawg
      .get(`https://api.rawg.io/api/games/${this.state.gameId}`)
      .then((response) => {
        this.setState({
          description: response.data.description_raw,
          loading: false,
          developers: response.data.developers,
          publishers: response.data.publishers,
        });
      });
  };
  //dropdown that selects the platform, until it is changed, the user cannot add the game
  handlePlatformSelection = (e, data) => {
    this.setState({
      platform: data.value,
      platformSelected: true,
      searchMessage: "",
    });
    console.log(this.state.platform);
  };

  renderCardGroup() {
    return this.state.games.map((game, index) => {
      if (
        game.short_screenshots === null ||
        game.short_screenshots.length === 0
      ) {
        return (
          <Card key={uuidv4()} onClick={() => this.handlePlateSelection(index)}>
            <Card.Content>
              <Image floated="right" size="tiny" icon="image" />
              <Card.Header>{game.name}</Card.Header>
              <Card.Meta>
                {moment(game.released).format("MMMM Do YYYY")}
              </Card.Meta>
              <Card.Description>
                <List horizontal></List>
              </Card.Description>
            </Card.Content>
          </Card>
        );
      } else {
        return (
          <Card key={uuidv4()} onClick={() => this.handlePlateSelection(index)}>
            <Card.Content>
              <Image
                floated="right"
                size="tiny"
                src={game.short_screenshots[0].image}
              />
              <Card.Header>{game.name}</Card.Header>
              <Card.Meta>
                {moment(game.released).format("MMMM Do YYYY")}
              </Card.Meta>
              <Card.Description>
                <List horizontal></List>
              </Card.Description>
            </Card.Content>
          </Card>
        );
      }
    });
  }

  //helper to render the drop down
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

  renderCard() {
    const genres = this.state.genres.map((genre, index) => {
      if (this.state.genres === null || this.state.genres.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{genre.name}</p>;
      }
    });
    const developers = this.state.developers.map((developer, index) => {
      if (
        this.state.developers === null ||
        this.state.developers.length === 0
      ) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{developer.name}</p>;
      }
    });
    const publishers = this.state.publishers.map((publisher, index) => {
      if (
        this.state.publishers === null ||
        this.state.publishers.length === 0
      ) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{publisher.name}</p>;
      }
    });

    return (
      <Card className="ui card">
        <Image
          className="image"
          src={this.state.selectedGame.short_screenshots[0].image}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{this.state.selectedGame.name}</Card.Header>
          <Card.Meta>
            {moment(this.state.releaseDate).format("MMMM Do YYYY")}
          </Card.Meta>
          <Card.Description className="description-style">
            <ReadMoreReact
              min={200}
              ideal={400}
              max={600}
              readMoreText="Read More"
              text={this.state.description}
            />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <List horizontal>
            <List.Item>
              <Image
                avatar
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1200px-Metacritic.svg.png"
              />
              <List.Content>
                <List.Header>Score</List.Header>
                {this.state.metacritic}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Genres </List.Header>
                {genres}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Developers </List.Header>
                {developers}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Publishers </List.Header>
                {publishers}
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <div className="dropdown-section">{this.renderDropdown()}</div>
          <p className="validation-error">{this.state.searchMessage}</p>
          <Button.Group basic size="small">
            <Popup
              content="Add to Backlog"
              trigger={
                <Button onClick={this.handleAddToBacklog} icon="gamepad" />
              }
            />
            <Popup
              content="Add to Wishlist"
              trigger={
                <Button onClick={this.handleAddToWishlist} icon="gift" />
              }
            />
            <Popup
              content="Back to Search"
              trigger={
                <Button onClick={this.resetGameSelection} icon="reply" />
              }
            />
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }

  renderForm() {
    return (
      <Container>
        <form onSubmit={this.onFormSubmit}>
          <div className="register-input-section">
            <Input
              icon="search"
              value={this.state.gameTitle}
              onChange={this.onGameTitleInputChange}
              name="gameTitle"
              autoComplete="off"
              type="text"
              placeholder="Search..."
            />
            <Button onClick={this.setLoading}>Submit</Button>
          </div>
        </form>
      </Container>
    );
  }

  render() {
    return (
      <div className="search">
        {!this.state.selectedGame ? (
          <div>
            <h1>Search</h1>
            {this.renderForm()}
          </div>
        ) : null}
        {this.state.loading === true ? (
          <React.Fragment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </React.Fragment>
        ) : !this.state.selectedGame && this.state.loading === false ? (
          <Card.Group className="ui cards">{this.renderCardGroup()}</Card.Group>
        ) : this.state.selectedGame ? (
          <React.Fragment>{this.renderCard()}</React.Fragment>
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
  addToFeed,
})(Search);
