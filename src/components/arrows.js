import React from 'react';

export const RightArrow = (props) => {
    return (
      <div className="nextArrow" onClick={props.goToNextSlide}> 
        <img width="40px" height="50px" style={{marginRight: '5px'}} alt="" src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Right%20Control3fc6d2d.png"/>
    </div>
    );
}


export const LeftArrow = (props) => {
    return (
      <div className="backArrow" onClick={props.goToPrevSlide}>
        <img width="40px" height="50px" style={{marginLeft: '5px'}} alt="" src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Left%20Control577660a.png"/>
    </div>
    );
}
