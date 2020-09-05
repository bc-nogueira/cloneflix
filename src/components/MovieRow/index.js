import React, { useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "./MovieRow.css";
import Movie from "../Movie";
import MovieInfo from "../MovieInfo";

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
      setShowLeft(false);
    }
    setShowRight(true);
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.results.length * 200;
    if (window.innerWidth - listWidth > x) {
      x = window.innerWidth - listWidth;
      setShowRight(false);
    }
    setShowLeft(true);
    setScrollX(x);
  };

  const handleMovieClick = (clickedItem, mediaType) => {
    setSelectedMovie(clickedItem);
    setMediaType(mediaType);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      {showLeft && (
        <div className="movieRow-left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </div>
      )}
      {showRight && (
        <div className="movieRow-right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </div>
      )}
      <div className="moviewRow-listarea">
        <div
          className="movieRow-list"
          style={{ marginLeft: scrollX, width: items.results.length * 200 }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <Movie key={key} item={item} onClick={handleMovieClick} />
            ))}
        </div>
      </div>
      {selectedMovie && (
        <MovieInfo item={selectedMovie} mediaType={mediaType} />
      )}
    </div>
  );
};
