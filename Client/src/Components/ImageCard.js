import React from "react";
import { Image } from "semantic-ui-react";
import "./ImageCard.css";

const ImageCard = (props) => {
  return (
    <div className="playing-image">
      <Image className="image-card" src={props.image} size="small" rounded />
      <div className="overlay">
        <div className="playing-image-text">{props.title}</div>
      </div>
    </div>
  );
};

export default ImageCard;
