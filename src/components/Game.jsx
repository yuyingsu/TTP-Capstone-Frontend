import React, { Component } from "react";
import GamePage from "./GamePage.jsx";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: this.props.game,
    };
  }

  handleAddToCart = (e) => {
    e.preventDefault();
  };

  handleFavorites = (e) => {
    e.preventDefault();
  };

  render() {
    console.log(this.state.details);

    return (
      <div>
        <div className="title">
          <h1>
            {this.state.details.name}
            <span>1st Edition</span>
          </h1>
        </div>
        <div className="subtitle">
          <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>
            {"Developed by " + this.state.details.developer}
          </h2>
        </div>
        <div className="photo-gallery">
          <img src={this.state.details.imageURL} alt="game pic" />
        </div>
        <div className="product-table">
          <table>
            <tr>
              <th>Developer</th>
              <th>{this.state.details.developer}</th>
            </tr>
            <th>Rating</th>
            <th>{this.state.details.rating}</th>
            <tr>
              <th>Platform(s)</th>
              <th>{this.state.details.platforms}</th>
            </tr>
            <tr>
              <th>Release</th>
              <th>{this.state.details.release}</th>
            </tr>
            <tr>
              <th>Price</th>
              <th>{this.state.details.price}</th>
            </tr>
          </table>
        </div>
        <div className="cartbttn">
          <div>
            <button type="button" onClick={this.handleFavorites}>
              Add to Favorites
            </button>
            <button type="button" onClick={this.handleAddToCart}>
              Add to Cart
            </button>

            <div className="availability">
              <h5>Available at the follwing stores:</h5>
              <ul>
                <li>Amazon</li>
                <li>Walmart</li>
                <li>Target</li>
                <li>GameStop</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="game-description">
          <div>
            <h1>Game Description</h1>
            <p>{this.state.details.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
