import './App.css';
import { Header } from './components'
import Products from './screens/Products';
import { Cart, Home, Payment, PlaceOrder, Product, Profile, Register, Shipping, Signin } from './screens/';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart}/>
          <Route path="/cart/:id" exact render={({match, location}) =>  <Cart match={match} location={location}/> } />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route path="/product/:id" component={Product} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/products" component={Products} />
        </div>
      </BrowserRouter>
  );
}

export default App;
