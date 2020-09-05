import React, { useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./Movie.css";
import Tmdb from "../../api/Tmdb";

export default ({ item, onClick }) => {
  const [mediaType, setMediaType] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [genres, setGenres] = useState([]);

  const handleMouseEnter = (hoveredItem) => {
    let media;

    if (hoveredItem.media_type) {
      media = hoveredItem.media_type;
    } else if (hoveredItem.first_air_date) {
      media = "tv";
    } else {
      media = "movie";
    }

    const loadInfo = async () => {
      let hoveredInfo = await Tmdb.getInfo(hoveredItem.id, media);

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

  const handleClick = (clickedItem, mediaType) => {
    onClick(clickedItem, mediaType);
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
        <div className="hovered-movie">
          <div className="hovered-movie-main">
            <div className="hovered-movie-left">
              <div className="hovered-movie-title">
                {hoveredItem.name || hoveredItem.title}
              </div>
              <div>
                {mediaType === "tv"
                  ? `${hoveredItem.number_of_seasons} temporada${
                      hoveredItem.number_of_seasons !== 1 ? "s" : ""
                    }`
                  : `${hoveredItem.runtime} minutos`}
              </div>

              <div>{genres.join(", ")}</div>
            </div>

            <div>
              <div>
                <PlayCircleOutlineIcon className="hovered-movie-play" />
              </div>
              <div>
                <AddCircleOutlineIcon className="hovered-movie-add" />
              </div>
            </div>
          </div>

          <div>
            <ExpandMoreIcon
              className="hovered-movie-expand"
              onClick={() => handleClick(hoveredItem, mediaType)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
