import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./api/Tmdb";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TransitionGroup } from "react-transition-group";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import MovieInfo from "./components/MovieInfo";
import Footer from "./components/Footer";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showingRow, setShowingRow] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let randomValue = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomValue];
      let chosenInfo = await Tmdb.getInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleMovieClick = (clickedItem, mediaType, key) => {
    setSelectedMovie(clickedItem);
    setMediaType(mediaType);
    setShowingRow(key);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
    setMediaType(null);
    setShowingRow(null);
  };

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <div key={key}>
            <MovieRow
              row={key}
              title={item.title}
              items={item.items}
              onClick={handleMovieClick}
            />
            {selectedMovie && showingRow === key ? (
              <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                <MovieInfo
                  item={selectedMovie}
                  mediaType={mediaType}
                  onClick={handleCloseClick}
                />
              </TransitionGroup>
            ) : null}
          </div>
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 && (
        <div className="loading">
          <img src={require("./images/cloneflix.png")} alt="loading" />
          <CircularProgress className="loading-icon" />
        </div>
      )}
    </div>
  );
};
