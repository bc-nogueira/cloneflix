import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.css";

export default ({ black }) => {
  return (
    <footer>
      <div>
        <span>
          Feito por{" "}
          <a className="link-white" href="http://bcnogueira.com.br/">
            Breno Nogueira
          </a>
        </span>
        <div style={{ marginTop: "10px" }}>
          <a
            className="link-white"
            href="https://www.linkedin.com/in/brenocnogueira/"
          >
            <LinkedInIcon style={{ fontSize: 25 }} />
          </a>
          <a
            className="link-white"
            href="https://github.com/bc-nogueira/cloneflix"
          >
            <GitHubIcon style={{ fontSize: 25, marginLeft: "10px" }} />
          </a>
        </div>
      </div>

      <div className="footer-right">
        <span style={{ marginBottom: "10px" }}>
          Direitos de imagem para Netflix
        </span>
        <span>
          Dados pegos do site{" "}
          <a className="link-white" href="https://www.themoviedb.org/">
            TMDB
          </a>
        </span>
      </div>
    </footer>
  );
};
