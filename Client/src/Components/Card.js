import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <div className="entire-card">
      <img className="card-image" alt="game" src={props.image} />
      <div className="card-title">
        <p>{props.name}</p>
      </div>
      <div className="container">
        <div className="categories">
          <img
            className="metacritic-image"
            alt="meta"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/1280px-Metacritic_logo.svg.png"></img>
          <p className="metacritic-score">{props.score}</p>
        </div>
        <div className="categories">
          <p className="bold">Genre(s)</p>
          <p className="header-styles">{props.genre}</p>
        </div>
      </div>
      <div className="platform-categories">
        <p className="bold">Platform(s)</p>
        <div className="platform-styles">{props.platform}</div>
      </div>
    </div>
  );
};
export default Card;
