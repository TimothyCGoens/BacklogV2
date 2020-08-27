import React from "react";
import "./ProfileList.css";

const ProfileList = (props) => {
  return (
    <div className="list-container">
      <div className="list-title">{props.title}</div>
    </div>
  );
};

export default ProfileList;
