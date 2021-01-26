import './App.css';
import Product from './screens/Products';
import Signin from './screens/Signin'
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Product} />
        <Route exact path="/signin" component={Signin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
