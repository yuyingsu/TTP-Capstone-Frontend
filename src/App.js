import './App.css';
import { Product, Register, Signin } from './screens/';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={Signin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
