import React from "react";
import "./plates.css";

const Plate = (props) => {
  return (
    <div>
      <div className="plate" onClick={props.clicked}>
        <div className="plate-top">
          <img className="image" alt="game" src={props.image} />
        </div>
        <div className="plate-bottom">
          <p className="title">{props.name}</p>
          <p>{props.releaseDate}</p>
          <p>{props.startDate}</p>
          <p>{props.finishedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Plate;
