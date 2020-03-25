import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import { useForm } from "react-hook-form";

const Search = () => {
  const { handleSubmit, register } = useForm();
  const [game, setGame] = useState("");
  const [search, setSearch] = useState("");

  const onSubmit = data => {
    console.log(data);
  };
  const [data, setData] = useState({ games: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/search/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=json&query="${search}"&resources=game`,
        { crossdomain: true }
      );
      setData(result.data);
    };
    fetchData();
  }, [search]);

  function handleGameSelection(e) {
    setGame(e.target.value);
  }

  return (
    <div className="search-page">
      <h1>Search</h1>
      <p>{game}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <label>Search for Games</label>
        <input
          ref={register}
          type="text"
          name="gameTitle"
          value={game}
          onChange={event => setGame}
        />
        <button type="button" onClick={() => setSearch(game)}>
          Search
        </button>
      </form>

      <ul>
        {data.games.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
