import React, { useState } from "react";
import Plate from "./Plate";
import axios from "axios";
import moment from "moment";
import Card from "./Card";
import Button from "./Button";
import "./search.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  // const [search, setSearch] = useState();
  const [selectedGame, setSelectedGame] = useState("");

  const resetGameSelection = () => {
    setSelectedGame("");
  };

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const gameSearch = () => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/search/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=json&query="${query}"&resources=game`,
        { crossdomain: true }
      )
      .then((response) => {
        setData(response.data.results);
      });
  };
  console.log(data);

  const handlePlateSelection = async (id) => {
    await axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/game/${id}/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=JSON`,
        { crossdomain: true }
      )
      .then((response) => {
        setSelectedGame(response.data.results);
      });
  };
  console.log(selectedGame);

  // const games = data.map((game) => {
  //   return (
  //     <Plate
  //       key={game.id}
  //       name={game.name}
  //       image={game.image.medium_url}
  //       releaseDate={moment(game.original_release_date).format("MMMM Do, YYYY")}
  //       clicked={() => handlePlateSelection(game.guid)}
  //     />
  //   );
  // });

  // const gameInfo = selectedGame.map((item) => {
  //   return (
  //     <div>
  //       <p>{item.name}</p>
  //       <p>{item.item.original_release_date}</p>
  //       <p>{item.deck}</p>
  //     </div>
  //   );
  // });


  return (
    <div className="search">
      <div className="input-section">
        <label className='search-label'>Enter Game Title</label>
        <input
          className='search-input'
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <button type="button" onClick={gameSearch}>
        Search
      </button>

      {!selectedGame ? (
        <div className="search-results">
          {data.map((game) => {
            return (
              <Plate
                key={game.id}
                name={game.name}
                image={game.image.medium_url}
                releaseDate={moment(game.original_release_date).format(
                  "MMMM Do, YYYY"
                )}
                clicked={() => handlePlateSelection(game.guid)}
              />
            );
          })}
        </div>
      ) : selectedGame ? (
        <div className="search-results">
          <div className="card-display">
            <Card
              key={selectedGame.id}
              name={selectedGame.name}
              image={selectedGame.image.medium_url}
              developer={selectedGame.developers[0].name}
              publisher={selectedGame.publishers[0].name}
              platform={selectedGame.platforms[0].name}
              genre={selectedGame.genres[0].name}
              description={selectedGame.deck}
            />
          </div>
          <div className="card-buttons">
            <Button
              label="Add to Backlog"
              className="card-backlog-button"
              clicked={handleButtonClick}
            />
            <Button
              label="Back"
              className="card-backlog-button"
              clicked={resetGameSelection}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
