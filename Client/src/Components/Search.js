import React, { useState, useEffect } from "react";
import Plate from "./Plate";
import axios from "axios";
import moment from "moment";
import "./search.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [selectedGame, setSelectedGame] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/search/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=json&query="${query}"&resources=game`,
        { crossdomain: true }
      );
      setData(result.data.results);
    };
    fetchData();
  }, [search]);
  console.log(data);

  const handlePlateSelection = (id) => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/game/${id}/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=JSON`,
        { crossdomain: true }
      )
      .then((response) => {
        setSelectedGame(response.data);
      });
  };
  console.log(selectedGame);

  const games = data.map((game) => {
    return (
      <Plate
        key={game.id}
        name={game.name}
        image={game.image.medium_url}
        releaseDate={moment(game.original_release_date).format("MMMM Do, YYYY")}
        clicked={() => handlePlateSelection(game.guid)}
      />
    );
  });

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
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>

      <div className="search-layout">
        <div className="search-highlight">Card placeholder</div>
      </div>
      {!selectedGame ? (
        <div className="search-results">{games}</div>
      ) : selectedGame ? (
        <div className="search-results">hello</div>
      ) : null}
    </div>
  );
};

export default Search;
