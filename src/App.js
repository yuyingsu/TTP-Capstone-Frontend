import './App.css';
import { Header } from './components'
import { Home, Register, Signin } from './screens/';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={Signin} />
        </div>
      </BrowserRouter>
  );
}

export default App;
