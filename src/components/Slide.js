import React from 'react';
import '../assets/css/home.css';

export const Slide = (props) => {
  return <div className="slide" style={props.styles}></div>
}

export const Indicators = (props) => {
    return (
    <div className="slide-indicator" >
      <ol>
        {props.imagesArray.map((obj, index) => {
          return (<ul key={index} className={index===props.currentIndex? 'active indicator': 'indicator'}></ul>)
        })}
        <ul></ul>
      </ol>
    </div>)
  }
