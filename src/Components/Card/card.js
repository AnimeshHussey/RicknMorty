import React from "react";
const Card = props => {
  return (
    <div className="card card__one">
      <div className="card__img">
        <img src={props.characterdata.image} />
      </div>
      <div className="card__desc">{props.characterdata.name}</div>
    </div>
  );
};

export default Card;
