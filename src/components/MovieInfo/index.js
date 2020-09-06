import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./MovieInfo.css";

export default ({ item, mediaType, onClick }) => {
  let firstDate = new Date(item.first_air_date || item.release_date);
  let genres = [];

  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = item.overview;
  if (description.length > 500) {
    description = description.substring(0, 300) + "...";
  }

  const handleClick = () => {
    onClick();
  };

  return (
    <section
      className="movie-info"
      style={{
        backgroundSize: "contain",
        backgroundPosition: "right center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="movie-info-horizontal">
        <div className="movie-info-vertical">
          <div className="movie-info-name">
            {item.original_name || item.title}
          </div>
          <div className="movie-info-info">
            <div className="movie-info-points">{item.vote_average} pontos</div>
            <div className="movie-info-year">{firstDate.getFullYear()}</div>
            <div className="movie-info-seasons">
              {mediaType === "tv"
                ? `${item.number_of_seasons} temporada${
                    item.number_of_seasons !== 1 ? "s" : ""
                  }`
                : `${item.runtime} minutos`}
            </div>
          </div>
          <div className="movie-info-description">{description}</div>
          <div className="movie-info-buttons">
            <a href={`/watch/${item.id}`} className="movie-info-watch-btn">
              &#9658; Assistir
            </a>
            <a href={`/list/add/${item.id}`} className="movie-info-my-list-btn">
              + Minha Lista
            </a>
          </div>
          <div className="movie-info-genres">
            <strong>Gêneros: </strong>
            {genres.join(", ")}
          </div>
        </div>
        <CloseIcon className="movie-info-close" onClick={handleClick} />
      </div>
    </section>
  );
};
