import React from "react";
import "./card.css";
// import Button from "./Button";

const Card = (props) => {
  return (
    <div className="entire-card">
      <div className="card-title">
        <p>{props.name}</p>
      </div>
      <div className="card-header">
        <div className="header-info">
          <p className="bold">Publisher(s)</p>
          <p className="header-styles">{props.publisher}</p>
          <p className="bold">Developer(s)</p>
          <p className="header-styles">{props.developer}</p>
          <p className="bold">Genre(s)</p>
          <p className="header-styles">{props.genre}</p>
          <p className="bold">Platform(s)</p>
          <p className="platform-styles">{props.platform}</p>
        </div>
      </div>
      <div className="deck">
        <p className="deck-style">{props.description}</p>
      </div>
    </div>
  );
};
export default Card;
