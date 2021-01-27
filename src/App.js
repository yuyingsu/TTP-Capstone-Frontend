import './App.css';
import { Header } from './components'
import { Cart, Home, Product, Profile, Register, Shipping, Signin } from './screens/';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <GamePage />
      {/* <Product/> */}
    </div>
=======
      <BrowserRouter>
        <Header />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart}/>
          <Route path='/cart/:id' exact render={({match, location}) =>  <Cart match={match} location={location}/> } />
          <Route path="/product/:id" component={Product} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/signin" component={Signin} />
        </div>
      </BrowserRouter>
>>>>>>> e7fa76aef0d04c65d1c68cd566da02c1b0861938
  );
}

export default App;
