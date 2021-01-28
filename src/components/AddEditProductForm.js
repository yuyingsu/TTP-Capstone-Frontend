import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEditProduct } from '../actions/productActions';
function AddEditProductForm(props){
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.product){
      setName(props.product.name);
      setPrice(props.product.price);
      setCountInStock(props.product.countInStock);
      setImage(props.product.image);
      setBrand(props.product.brand);
      setDescription(props.product.description);
    }
    return () => {
    };
    }, []);

  const submitFormAdd = e => {
    e.preventDefault();
    const newProduct = {
        name,
        price,
        countInStock,
        image,
        brand,
        description
      };
    dispatch(addEditProduct(newProduct));
    }

  const submitFormEdit = e => {
    e.preventDefault();
    const newProduct = {
      _id: props.product._id,
      name,
      price,
      countInStock,
      image,
      brand,
      description
    };
    dispatch(addEditProduct(newProduct));
  }

  const sumbitChange = (e) =>{
    if(!props.product){
      submitFormAdd(e);
    }else{
      submitFormEdit(e);
    }
    props.toggle();
  }

  const onChange = (e) => {
    switch(e.target.name){
      case "name":
        setName(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "countInStock":
        setCountInStock(e.target.value);
        break;
      case "image":
        setImage(e.target.value);
        break;
      case "brand":
        setBrand(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);   
    }
  }
  return (
      <Form onSubmit={sumbitChange}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={onChange} value={name === null ? '' : name} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="text" name="price" id="price" onChange={onChange} value={price === null ? '' : price}  />
        </FormGroup>
        <FormGroup>
          <Label for="countInStock">Count In Stock</Label>
          <Input type="text" name="countInStock" id="countInStock" onChange={onChange} value={countInStock === null ? '' : countInStock} />
        </FormGroup>
        <FormGroup>
          <Label for="Image">Image</Label>
          <Input type="text" name="image" id="image" onChange={onChange} value={image === null ? '' : image} />
        </FormGroup>
        <FormGroup>
          <Label for="brand">Brand</Label>
          <Input type="text" name="brand" id="brand" onChange={onChange} value={brand === null ? '' : brand} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" onChange={onChange} value={description === null ? '' : description}   />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
}

export default AddEditProductForm;