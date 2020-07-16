import React from "react";
import "./card.css";
import Button from "./Button";

const Card = (props) => {
  return (
    <div className="entire-card">
      <div className="card-title">
        <p>{props.name}</p>
      </div>
      <div className="card-header">
        <div className="image-spot">
          <img className="card-image" alt="box art" src={props.image} />
        </div>
        <div className="header-info">
          <p className="bold">Publisher</p>
          <p className="header-styles">{props.publisher}</p>
          <p className="bold">Developer</p>
          <p className="header-styles">{props.developer}</p>
          <p className="bold">Genre</p>
          <p className="header-styles">{props.genre}</p>
          <p className="bold">Platform</p>
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
