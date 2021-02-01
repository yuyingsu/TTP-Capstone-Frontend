import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../components/ModalForm';
import { Button } from 'reactstrap';
import { Table } from "react-bootstrap";
import "bootstrap/js/src/collapse.js";
import { deleteProduct } from '../actions/productActions';

function Products(props) {
  const products = useSelector(state => state.pds.products);
  const dispatch = useDispatch();
  const deleteAProduct = (product) =>{
    dispatch(deleteProduct(product))
  }

  let lists = products.map((product) => (
    <Fragment>
    <tr key={product._id}
        data-toggle="collapse"
        data-target={`.multi-collapse-${product._id}`}
        aria-controls={`multiCollapse-${product._id}`}>
      <td><Link to={'/product/' + product._id}>{product._id}</Link></td>
      <td>{product.name}</td>
      <td>{"$" + product.price}</td>
      <td>{product.countInStock}</td>
      <td>{product.image}</td>
      <td>{product.brand}</td>
      <td>{"Expand to View"}</td>
      <td>
      <div style={{width:"160px"}}>
          <ModalForm buttonLabel={"Edit"} product={product}/>
          {' '}
          <Button color="danger" onClick={() => deleteAProduct(product)}>Del</Button>
        </div>
      </td>
    </tr>
               <tr class={`collapse multi-collapse-${product._id}`} id={`multiCollapseExample-${product._id}`}>
               <td>{product.description}</td>
           </tr>
           </Fragment>
  ));

  let res = (
    <Table responsive hover className="products">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Count In Stock</th>
        <th>Image</th>
        <th>Brand</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {lists}
    </tbody>
  </Table>);

  return (
    <div>
      {res}
      <ModalForm buttonLabel={"Add"} product={null}/>
    </div>
  );
}

export default Products;
