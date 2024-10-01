import React from 'react';

const Card = ({ id, name, imageUrl, onClick, selected, height, width }) => {
  return (
    <div
      className={`card-container ${selected ? 'selected' : ''}`}
      onClick={onClick ? () => onClick(id, name, imageUrl) : null}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img className='card-img' src={imageUrl} alt={name} style={{ height: height, width: width }} />
      <p className='card-name'>{name}</p>
    </div>
  );
};

export default Card;
