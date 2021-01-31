import React from 'react';
import CardProduct from '../components/CardProduct';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paginations from './Paginations';
import { Container, Row, Col } from 'reactstrap';
import { listProducts } from '../actions/productActions';

function SearchResults(props) {
  const searchKeyword = props.match.params.name;
  const sortOrder = props.location.search ? props.location.search.split("=")[1] : ''
  const [page, setPage] = useState(1);
  const loading = useSelector(state => state.pds.loading);
  const loadingAll = useSelector(state => state.pds.loadingAll);
  const products= useSelector(state => state.pds.products);
  const productList= useSelector(state => state.pds.productList);
  const total= useSelector(state => state.pds.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(page,searchKeyword,sortOrder));
    return () => {
    };
  }, [page, sortOrder, searchKeyword]);

  let res = null;
  let length=0;
  if (!loading && !loadingAll && productList) {
    res = productList.map((product) => (
      <Col className="d-flex justify-content-center align-items-center">
        <CardProduct
          price={product.price}
          countInStock={product.countInStock}
          rating={product.rating}
          numReviews={product.numReviews}
          id={product._id}
          name={product.name}
          image={product.image}
          brand={product.brand}
          category={product.category}
          description={product.description}
          reviews={product.reviews}
          key={product._id}
        />
      </Col>
    ));
  if (searchKeyword) {
    length = Math.ceil(total / 6);
  } else {
    length=Math.ceil(products.length / 6);
  }
  } else {
    <div>Loading...</div>
  }

  return (
    <Container style={{marginTop: "40px"}}>
      <Row>
        {res}
      </Row>
      {products.length > 6 &&
      <Row className="d-flex justify-content-center align-items-center my-4">
      <Paginations length={Math.max(length,1)} page={page} setPage={setPage}/>
      </Row>}
    </Container>
  )
}

export default SearchResults;
