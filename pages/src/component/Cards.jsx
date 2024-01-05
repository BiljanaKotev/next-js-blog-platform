import React from 'react';
import '../component/Cards.module.css';
import { useState } from 'react';

function Cards() {
  const [isHover, setIsHover] = useState(null);
  const [initialIconColor, setInitialIconColor] = useState('#0d86d3');

  const hoverOnCard = (icon) => {
    setIsHover(icon);
  };

  const clearHover = () => {
    setIsHover(null);
    setInitialIconColor('#0d86d3');
  };

  const cardDetails = [
    {
      icon: 'fa-solid fa-2xl fa-user card-icon ',
      title: 'Get started',
      content: 'Sign up to start sharing your travel experiences with others',
    },
    {
      icon: 'fa-solid fa-2xl fa-globe card-icon',
      title: 'Connect',
      content: 'Your one stop destination to connect with travelers from around the world',
    },
    {
      icon: 'fa-solid fa-2xl fa-share card-icon',
      title: 'Share',
      content: 'Personal travel stories and local tips with a dynamic community!',
    },
  ];

  return (
    <div className='card-grid-container'>
      {cardDetails.map((cardDetail) => {
        return (
          <div key={cardDetail.icon} onMouseOver={() => hoverOnCard(cardDetail.icon)} onMouseOut={clearHover} className='card'>
            {isHover === cardDetail.icon ? (
              <i style={{ color: '#ffffff' }} className={cardDetail.icon}></i>
            ) : (
              <i style={{ color: initialIconColor }} className={cardDetail.icon}></i>
            )}
            <h1>{cardDetail.title}</h1>
            <h2>{cardDetail.content}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
