import React, { Component } from "react";
import './Product.css'
import { connect } from 'react-redux';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty:0
    };

  }

  handleAddToCart = (e) => {
    e.preventDefault();
    this.props.history.push('/cart/' + this.props.match.params.id + '?qty=' + this.state.qty);
  };

  setQty = (qty) => {
    this.setState({qty:qty});
  };

  render() {
    let product = this.props.cps.find(product => product._id == this.props.match.params.id);
    return (
      <div>
        <div className="title">
          <h1>
            {product.name}
            <span>1st Edition</span>
          </h1>
        </div>
        <div className="subtitle">
          <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>
            {"Developed by " /*this.state.details.developer*/}
          </h2>
        </div>
        <div className="photo-gallery">
          <img src={product.image} alt="game pic" />
        </div>
        <div className="product-table">
          <table>
            <tr>
              <th>Developer</th>
              <th>{/*this.state.details.developer*/}</th>
            </tr>
            <th>Rating</th>
            <th>{product.rating}</th>
            <tr>
              <th>Platform(s)</th>
              <th>{/*this.state.details.platform*/}</th>
            </tr>
            <tr>
              <th>Release</th>
              <th>{/*this.state.details.release*/}</th>
            </tr>
            <tr>
              <th>Price</th>
              <th>{product.price}</th>
            </tr>
          </table>
        </div>
        <div className="cartbttn">
          <div>
            <button type="button" onClick={this.handleAddToCart}>
              Add to Cart
            </button>
            <select onChange={(e)=>{this.setQty(e.target.value)}}>
            {[...Array(product.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
            </select>
          </div>
        </div>
        <div className="game-description">
          <div>
            <h1>Game Description</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      cps: state.pds.products
  }
};
export default connect(mapStateToProps, null)(Product);

