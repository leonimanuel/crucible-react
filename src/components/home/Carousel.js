import React, { useState, useEffect } from "react";
import "./carousel.css";

import HighlightGif from './contextual-highlight.gif';
import ActivityGif from "./activity.gif"
// import ActivityGif from "./activity-rounded.gif"
// import SearchGif from "./search.gif"
import SearchGif from "./search-simple.gif"

const Carousel = ({ children }) => {
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);
  const content = children;

  const handleNext = () => {
    if (counter !== content.length) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
  };

  const handlePre = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    } else {
      setCounter(content.length);
    }
  };

  const handlePage = page => {
    setCounter(page);
  };

  const handleMouse = () => {
    setPause(!pause);
  };

  const resetImages = () => {
    // let collectionGifImgFrame = document.getElementById("collection-frame-img")
    // collectionGifImgFrame.style.backgroundImage = `url(${HighlightGif})`

    // let activityGifImgFrame = document.getElementById("activity-frame-img")
    // activityGifImgFrame.style.backgroundImage = `url(${ActivityGif})`

    // let searchGifImgFrame = document.getElementById("search-frame-img")
    // searchGifImgFrame.style.backgroundImage = `url(${SearchGif})` 

    let highlightGifImg = document.getElementById("highlight-gif")
    highlightGifImg.src = HighlightGif

    let activityGifImg = document.getElementById("activity-gif")
    activityGifImg.src = ActivityGif

    let searchGifImg = document.getElementById("search-gif")
    searchGifImg.src = SearchGif       
  }

  useEffect(() => {
    resetImages()
    let interval = setInterval(() => {
      if (!pause) {
        resetImages()
        handleNext();
      } else {
        clearInterval(interval);
      }
    }, 9000);
    return () => clearInterval(interval);
  });

  return (
    <div className="Carousel-App">
      <div
        className="slide"
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {content.map((item, index) => (
          <div
            className={counter - 1 === index ? "show" : "not-show"}
            key={index}
          >
            {item}
          </div>
        ))}

{/*        <button className="prev" onClick={handlePre}>
          &#10094;
        </button>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>*/}
      </div>

{/*      <div className="page">
        {content.map((item, index) => (
          <span
            key={index}
            className={counter - 1 === index ? "dot active" : "dot"}
            onClick={() => handlePage(index + 1)}
          />
        ))}
      </div>*/}
    </div>
  );
};

export default Carousel;
