import React, { useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./Movie.css";
import Tmdb from "../../api/Tmdb";

export default ({ item }) => {
  const [mediaType, setMediaType] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [genres, setGenres] = useState([]);

  const handleMouseEnter = (item) => {
    let media;

    if (item.media_type) {
      media = item.media_type;
    } else if (item.first_air_date) {
      media = "tv";
    } else {
      media = "movie";
    }

    const loadInfo = async () => {
      let hoveredInfo = await Tmdb.getInfo(item.id, media);

      let genres = [];
      let genresLength = hoveredInfo.genres[0].name.length;
      genres.push(hoveredInfo.genres[0].name);
      for (let i = 1; i < hoveredInfo.genres.length; i++) {
        genresLength = genresLength + hoveredInfo.genres[i].name.length;
        if (genresLength > 14) break;
        genres.push(hoveredInfo.genres[i].name);
      }

      setHoveredItem(hoveredInfo);
      setMediaType(media);
      setGenres(genres);
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
          <div className="movie-main-info">
            <div className="movie-info-left">
              <div className="movie-info-title">
                {hoveredItem.name || hoveredItem.title}
              </div>
              <div>
                {mediaType === "tv"
                  ? `${hoveredItem.number_of_seasons} temporadas`
                  : `${hoveredItem.runtime} minutos`}
              </div>

              <div>{genres.join(", ")}</div>
            </div>

            <div>
              <div>
                <PlayCircleOutlineIcon className="movie-info-play" />
              </div>
              <div>
                <AddCircleOutlineIcon className="movie-info-add" />
              </div>
            </div>
          </div>

          <div>
            <ExpandMoreIcon className="movie-info-expand" />
          </div>
        </div>
      )}
    </div>
  );
};
