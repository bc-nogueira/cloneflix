const API_KEY = "53d2ca09ff82b5fe6783c6e85611bf31";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais da Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/trending/all/week?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/movie/top_rated?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/discover/movie?with_genres=28&with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/discover/movie?with_genres=35&with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/discover/movie?with_genres=27&with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/discover/movie?with_genres=10749&with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentário",
        items: await basicFetch(
          // Ele não colocou o with_network aqui
          `/discover/movie?with_genres=99&with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  },
};
