import React, { useState } from "react";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import "./Movie.css";
import Tmdb from "../../api/Tmdb";

export default ({ item }) => {
  const [mediaType, setMediaType] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    let media;

    if (item.media_type) {
      media = item.media_type;
    } else if (item.first_air_date) {
      media = "tv";
    } else {
      media = "movie";
    }

    console.log("Step 2");

    const loadInfo = async () => {
      let hoveredInfo = await Tmdb.getInfo(item.id, media);
      setHoveredItem(hoveredInfo);
      setMediaType(media);
    };
    loadInfo();
  };

  const handleMouseLeave = () => {
    setMediaType(null);
    setHoveredItem(null);
  };

  return (
    <div
      className="movie-item"
      onMouseEnter={() => handleMouseEnter(item)}
      onMouseLeave={() => handleMouseLeave()}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        alt={item.original_title}
      />

      {hoveredItem && (
        <div className="movie-info">
          <div className="movie-info-left">
            <div className="movie-info-title">{hoveredItem.name || hoveredItem.title}</div>
            <div>
              {mediaType === "tv"
                ? `${hoveredItem.number_of_seasons} temporadas`
                : `${hoveredItem.runtime} minutos`}
            </div>
          </div>

          <div>
            <div><PlayCircleOutlineIcon className="movie-info-play" /></div>
            <div><AddCircleOutlineIcon className="movie-info-add"  /></div>
          </div>
        </div>
      )}
    </div>
  );
};
