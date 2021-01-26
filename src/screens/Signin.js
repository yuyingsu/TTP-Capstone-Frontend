import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Column} from 'reactstrap';

function Signin(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    dispatch(signin(email, password));
  }

  return <Container>
    <Form onSubmit={submitHandler}>
    <h2>Sign-in</h2>
    <br></br>
    {loading && <div>Loading...</div>}
    {error && <div>{error}</div>}
  <FormGroup>
    <Label for="email">Email</Label>
    <Input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
  </FormGroup>
  <FormGroup>
    <Label for="password">Password</Label>
    <Input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
  </FormGroup>
  <Button type="submit" className="button primary">Sign In</Button>
  <Container>
  <Row>
          New to Gamer.com?
        </Row>
        <Row>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your Gamer.com account</Link>
        </Row>
        </Container>
    </Form>
    </Container>
}
export default Signin;
