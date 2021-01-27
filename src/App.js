import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from './screens/Cart';
function App() {
  return (
    <div className="App">
       <Router>
          <div>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/cart" component={Cart}/>
            <Route path='/cart/:id' exact render={({match, location}) =>  <Cart match={match} location={location}/> } />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
