import React from 'react';
import CardProduct from '../components/CardProduct';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Paginations from './Paginations';
import { Col } from 'reactstrap';
import { listAllProducts,listProducts } from '../actions/productActions';

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
      return () => {
      };
      }, [page, sortOrder, searchKeyword]);

      const submitSearchTerm = (term) => {
        setSearchKeyword(term);
      }

      let res = null;
      if(!loading && productList){
      res = productList.map((product) => (
        <span>
        <Col xs="12" s="6" m="3" l="3" xl="3">
        <CardProduct price={product.price} countInStock={product.countInStock}
        rating={product.rating} numReviews={product.numReviews} id={product._id}
        name={product.name} image={product.image} brand={product.brand}
        category={product.category} description={product.description}
        reviews={product.reviews} key={product._id}/>
        </Col>
        </span>));
      }else{
        <div>Loading...</div>
      }
      return(
          <div>
              <SearchBox submitSearchTerm={submitSearchTerm}/>
              {res}
              <Paginations length={Math.ceil(products.length/3)} page={page} setPage={setPage}/>
          </div>
      )
    }
export default Home;