import "./App.css";
import Dogs from "./components/Dogs/Dogs";
import LandingPage from "./components/LandingPage/LandingPage";
import Order from "./components/Order/Order";
import SearchBar from "./components/SearchBar/SearchBar";
import { Switch, Route } from "react-router";
import DogDetail from "./components/DogDetail/DogDetail";
import AddDog from "./components/AddDog/AddDog";
import NavBar from "./components/NavBar/NavBar";
import Filter from "./components/Filter/Filter";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home">
          <NavBar />
          <div className="orderyFilter">
            <Order />
            <Filter />
          </div>
          <SearchBar />
          <Dogs />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/add" component={AddDog} />
        <Route exact path="/:id" component={DogDetail} />
      </Switch>
    </div>
  );
}

export default App;
