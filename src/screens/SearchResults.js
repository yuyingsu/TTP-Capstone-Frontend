import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import CardProduct from '../components/CardProduct';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Paginations from './Paginations';
import { Container, Row, Col } from 'reactstrap';
import { listAllProducts,listProducts } from '../actions/productActions';
function SearchResults(props){
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
      console.log(sortOrder);
      dispatch(listProducts(page,searchKeyword,sortOrder));
      return () => {
      };
      }, [page, sortOrder, searchKeyword]);

     // const submitSearchTerm = (term) => {
     //   setSearchKeyword(term);
      //}
      console.log(productList);
      let res = null;
      let length=0;
      if(!loading && !loadingAll && productList){
        console.log(productList)
        res = productList.map((product) => (
        <Col className="d-flex justify-content-center align-items-center">
        <CardProduct price={product.price} countInStock={product.countInStock}
        rating={product.rating} numReviews={product.numReviews} id={product._id}
        name={product.name} image={product.image} brand={product.brand}
        category={product.category} description={product.description}
        reviews={product.reviews} key={product._id}/>
        </Col>
       ));
      if(searchKeyword){
        length=Math.ceil(total/3);
      }else{
        length=Math.ceil(products.length/3);
      }
      }else{
        <div>Loading...</div>
      }
      return(
          <><Container>
            <Row>
              {res}
            </Row>
            {products.length > 3 &&
            <Row className="d-flex justify-content-center align-items-center my-4">
            <Paginations length={Math.max(length,1)} page={page} setPage={setPage}/>
            </Row>}
            </Container>
        </>
      )
    }
export default SearchResults;
