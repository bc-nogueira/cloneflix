import React, { useState } from "react";

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
      className="movieRow-item"
      onMouseEnter={() => handleMouseEnter(item)}
      onMouseLeave={() => handleMouseLeave()}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        alt={item.original_title}
      />

      {hoveredItem && (
        <div
          style={{
            width: "100%",
            position: "absolute",
            zIndex: 2,
            bottom: 0,
            paddingRight: "5px",
          }}
        >
          <h1>{hoveredItem.name || hoveredItem.title}</h1>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {mediaType === "tv"
                ? `${hoveredItem.number_of_seasons} temporadas`
                : `${hoveredItem.runtime} minutos`}
            </div>
            <div>Play</div>
          </div>
          <div>
            <div>generos</div>
            <div>Adicionar</div>
          </div>
        </div>
      )}
      {/* <div
        style={{ position: "absolute", zIndex: 2, top: 0, left: 0 }}
      >
        {item.name || item.title}
      </div> */}
    </div>
  );
};
