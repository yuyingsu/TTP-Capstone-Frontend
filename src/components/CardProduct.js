import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from "react-router-dom";


function CardProduct(props) {

  return(
        <Card style={{height:"400px", width: "300px"}}>
        <Link to={`/product/${props.id}`}>
        <CardImg top width="100%" src={props.image} alt="Card image cap" style={{height:"300px"}}/>
        <CardTitle>{props.name}</CardTitle>
        <CardBody>
        </CardBody></Link>
        </Card>
    );
}

export default CardProduct;
