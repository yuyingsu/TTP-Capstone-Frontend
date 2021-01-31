import './App.css';
import { Header } from './components'
import Products from './screens/Products';
import Order from './screens/Order';
import Orders from './screens/Orders';
import { Cart, Home, MyOrders, Payment, PlaceOrder, Product, Profile, Register, SearchResults, Shipping, Signin } from './screens/';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart}/>
        <Route path="/cart/:id"
          exact render={({history, match, location}) =>  <Cart
            history={history}
            match={match}
            location={location}/>
          }/>
        <Route exact path="/myorders" component={MyOrders} />
        <Route exact path="/orders" component={Orders} />
        <Route path="/order/:id" component={Order}></Route>
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/placeorder" component={PlaceOrder} />
        <Route path="/product/:id" component={Product} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={Register} />
        <Route path="/search/name/:name?"
          component={SearchResults}
          exact
        ></Route>
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/products" component={Products} />
      </div>
    </BrowserRouter>
  );
}

export default App;
