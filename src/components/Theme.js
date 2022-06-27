import React, { useState } from 'react';
import './Gallery.css';

const Theme = ({ThemeName, imageLink}) => {
  const [clicked, setClicked] = useState(false);
  const showBorder = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  return ( 
    <img 
      className = {clicked ? "picture-gallery border-img" : "picture-gallery noborder-img"}
      id = {ThemeName}
      src = {imageLink} 
      alt = {ThemeName}
      onClick={showBorder}
    />

  )
}

export default Theme;