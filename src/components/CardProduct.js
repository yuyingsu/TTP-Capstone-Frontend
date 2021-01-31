import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from "react-router-dom";
import { Rating } from './';

function CardProduct(props) {
  return (
    <Card style={{height:"400px", width: "300px", border: "none", background:"none"}} className="mt-4">
    <Link to={`/product/${props.id}`}>
    <CardImg top width="100%" src={props.image} alt="Card image cap" style={{height:"300px"}}/>
    <CardTitle>{props.name}</CardTitle></Link>
    <Rating value={props.rating} text={props.numReviews} />
    {"$" + props.price}
    </Card>
  );
}

export default CardProduct;
