import React from "react";
import { Image } from "semantic-ui-react";
import "./ImageCard.css";

const ImageCard = () => {
  return (
    <Image className="image-card" src={"/elliot.jpg"} size="small" rounded />
  );
};

export default ImageCard;
