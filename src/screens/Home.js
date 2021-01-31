import React from 'react';
import { CardProduct} from '../components/';
import Paginations from './Paginations'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { listAllProducts,listProducts } from '../actions/productActions';

function Home(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);
  const loading = useSelector(state => state.pds.loading);
  const products= useSelector(state => state.pds.products);
  const productList= useSelector(state => state.pds.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAllProducts());
    dispatch(listProducts(page,searchKeyword,sortOrder));
    return () => {};
  }, [page, sortOrder, searchKeyword]);

  let res = null;
  if (!loading && productList) {
  res = productList.map((product) => (
    <Col className="d-flex justify-content-center align-items-center">
    <CardProduct price={product.price} countInStock={product.countInStock}
    rating={product.rating} numReviews={product.numReviews} id={product._id}
    name={product.name} image={product.image} brand={product.brand}
    category={product.category} description={product.description}
    reviews={product.reviews} key={product._id}/>
    </Col>
    ));
  } else {
    <div>Loading...</div>
  }

  return (
    <Container style={{marginTop: "40px"}}>
      <Row >
        {res}
      </Row>
      {products.length > 6 &&
      <Row className="d-flex justify-content-center align-items-center my-4"><Paginations length={Math.ceil(products.length/6)} page={page} setPage={setPage}/></Row>}
    </Container>
  )
}

export default Home;
