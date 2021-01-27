import './App.css';
import { Header } from './components'
import { Cart, Home, Product, Register, Shipping, Signin } from './screens/';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart}/>
            <Route path='/cart/:id' exact render={({match, location}) =>  <Cart match={match} location={location}/> } />
            <Route path="/product/:id" component={Product} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/signin" component={Signin} />
        </div>
      </BrowserRouter>
  );
}

export default App;
