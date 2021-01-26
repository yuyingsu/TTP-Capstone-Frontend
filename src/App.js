import "./App.css";
import Product from "./screens/Products";
import GamePage from "./components/GamePage.jsx";

function App() {
  return (
    <div className="App">
      <GamePage name="Sekiro" developer="From Software" />
      {/* <Product/> */}
    </div>
  );
}

export default App;
