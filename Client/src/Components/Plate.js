import React from "react";
import "./plates.css";

const Plate = (props) => {
  return (
    <div>
      <div className="plate" onClick={props.clicked}>
        <div className="plate-layout">
          <div className="image">
            <img src={props.image} alt="box-art" />
          </div>
          <div className="plate-body">
            <p className="title">{props.name}</p>
            <p>{props.releaseDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plate;
