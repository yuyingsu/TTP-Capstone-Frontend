import React, { Component } from "react";
import Game from "./Game.jsx";
import similarGames from "../css/similarGames.css";

class SimilarGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: this.props.game,
    };
  }
  render() {
    return <div className="scrollmenus"></div>;
  }
}

export default SimilarGames;
