import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button } from 'reactstrap';

function Shipping(props) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ fullName, address, address2, city, state, zip }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>
          <li>
            <label htmlFor="fullName">
              Name
          </label>
            <input type="text" name="fullName" id="fullName" onChange={(e) => setFullName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="address">
              Address Line 1
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="address2">
              Address Line 2
          </label>
            <input type="text" name="address2" id="address2" onChange={(e) => setAddress2(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="state">
              State
          </label>
            <input type="text" name="state" id="state" onChange={(e) => setState(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="zip">
              Zip Code
          </label>
            <input type="text" name="zip" id="zip" onChange={(e) => setZip(e.target.value)}>
            </input>
          </li>
          <li>
            <Button type="submit" className="button primary">Continue</Button>
          </li>
        </ul>
      </form>
    </div>
  </div>
}

export default Shipping;
