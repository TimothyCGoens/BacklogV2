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

  return <div className="search-page">Hello</div>;
};

export default Search;
