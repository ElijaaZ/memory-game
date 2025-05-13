import React from "react";

const Card = ({ src, name, onClick, flipped }) => {
  return (
    <div className="card" onClick={onClick}>
      {flipped ? (
        <img className="card-icon" src={src} alt={name} />
      ) : (
        <div className="card-back" />
      )}
    </div>
  );
};

export default Card;
