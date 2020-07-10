import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import { useForm } from "react-hook-form";

const Search = () => {
  const { handleSubmit, register } = useForm();
  const [game, setGame] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [search, setSearch] = useState("");

  const onSubmit = (data) => {
    console.log(data);
  };
  const [data, setData] = useState({ games: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.rawg.io/api/games${game}`);
      setData(result);
    };
    fetchData();
  }, []);

  function handleGameSelection(e) {
    setGame(e.target.value);
  }

  const handleTextChange = (e) => {
    setGameTitle(e.target.value);
  };

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
          value={gameTitle}
          onChange={(event) => setGame}
        />
        <button type="button" onClick={() => handleGameSelection()}>
          Search
        </button>
      </form>

      <ul>Game Searched: {game}</ul>
    </div>
  );
};

export default Search;
