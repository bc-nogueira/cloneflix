import React, { useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "./MovieRow.css";
import Movie from "../Movie";
import Tmdb from "../../api/Tmdb";

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);

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

  const handleMouseEnter = (item) => {
    console.log("Mouse enter");

    let media_type;

    if (item.media_type) {
      media_type = item.media_type;
    } else if (item.first_air_date) {
      media_type = "tv";
    } else {
      media_type = "movie";
    }

    // alert(media_type);

    const loadInfo = async () => {
      let hoveredInfo = await Tmdb.getInfo(item.id, media_type);

      setHoveredMovie(hoveredInfo);
    };

    loadInfo();

    // debugger;

    // console.log("Mouse enter");
  };

  // Can set that directly on the component
  const handleMouseLeave = () => {
    setHoveredMovie(null);
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
              <Movie key={key} item={item} />
              // <div
              //   key={key}
              //   className="movieRow-item"
              //   onMouseEnter={() => handleMouseEnter(item)}
              //   onMouseLeave={handleMouseLeave}
              // >
              //   <img
              //     src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              //     alt={item.original_title}
              //   />

              //   {hoveredMovie &&
              //     (item.name === hoveredMovie.name ||
              //       item.title === hoveredMovie.name) && (
              //       <h1>{hoveredMovie.name}</h1>
              //     )}
              //   {/* <div
              //     style={{ position: "absolute", zIndex: 2, top: 0, left: 0 }}
              //   >
              //     {item.name || item.title}
              //   </div> */}
              // </div>
            ))}
        </div>
      </div>
    </div>
  );
};
