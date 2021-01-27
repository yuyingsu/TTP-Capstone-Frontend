import React, { Component } from "react";
import gamepage from "../css/gamepage.css";
import Game from "./Game.jsx";
import axios from "axios";
import SimilarGames from "./SimilarGames";
import NavigationBar from "./NavigationBar.jsx";

class GamePage extends Component {
  state = {
    //make this array of objects and display multiple games in a page?
    info: {
      name: "Sekiro: Shadows Die Twice ",
      developer: "From Software",
      imageURL:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      rating: "9.7/10",
      platforms: "PC, PS4, Xbox One ",
      release: "May 22, 2019",
      price: "$59.99",
      description:
        "fawfka akwnfwaf oiawfioawfioaw fawhfoiwahfoa oaijhoiawhfioa oiawhfoiawhf owahfioawh ofwifio foiafoa o oiahfoiahoa opajfpaw fpajfpoawj pofjapofja fop faopjfa faj fpoa fapofjopaj poajpoaj pawjp fpoa fapo gpajfpaa ahfsajopfjap  fpiapoSK ;zfjzsf oifhafup aijf paojfpahfaj f[ojfpj fjFOhfkl;j;LFJAPOFA FJ AO;H POAJOAJPOGAHWOPpohpoghpgos pghpsoh gopsh goshgishgpshglksg hslkhgspig hps ghspog s;gjj gspoi ogj gp giphsfiosh gohsiouhsgoaj j[ g[a g[a p[g a[p jaewpi fawjfpoawjg 8 w8 9w hfa fakl",
    },
  };

  componentDidMount() {
    axios
      .get("insert api")
      .then((res) => {
        this.setState({ info: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="game-page">
        <NavigationBar />
        <Game game={this.state.info /*[0]*/} />
        <SimilarGames game={this.state.info[1]} />
      </div>
    );
  }
}

export default GamePage;
