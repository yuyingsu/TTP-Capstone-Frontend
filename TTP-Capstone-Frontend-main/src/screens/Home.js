import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { CardProduct, Spinners} from '../components/';
import Paginations from './Paginations'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { listAllProducts,listProducts } from '../actions/productActions';
import { exitRegister } from '../actions/userActions';
function Home(props){
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
      dispatch(exitRegister());
      return () => {
      };
      }, [page, sortOrder, searchKeyword]);

      const submitSearchTerm = (term) => {
        setSearchKeyword(term);
      }

      let res = null;
      if(!loading && productList){
        //console.log(productList)
      res = productList.map((product) => (

        <Col className="d-flex justify-content-center align-items-center">
        <CardProduct price={product.price} countInStock={product.countInStock}
        rating={product.rating} numReviews={product.numReviews} id={product._id}
        name={product.name} image={product.image} brand={product.brand}
        category={product.category} description={product.description}
        reviews={product.reviews} key={product._id}/>
        </Col>
       ));
      }else{
        <div>Loading...</div>
      }
      return(
          <><Container>
            <Row >
              {res}
            </Row>
            {products.length > 3 &&
            <Row className="d-flex justify-content-center align-items-center my-4"><Paginations length={Math.ceil(products.length/3)} page={page} setPage={setPage}/></Row>}
            </Container>
        </>
      )
    }
export default Home;
