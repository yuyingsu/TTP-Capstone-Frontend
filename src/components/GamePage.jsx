import React, { Component } from "react";

class ProductPage extends Component {
  state = {
    name: "",
    developer: "",
    rating: "",
    platform: "",
    "release date": "",
    price: "",
    imageURL: "",
    videoURL: "",
    description: "",
  };
  render() {
    return <div className="product-page"></div>;
  }
}

export default ProductPage;
