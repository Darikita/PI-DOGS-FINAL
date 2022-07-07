import "./App.css";
import Dogs from "./components/Dogs/Dogs";
import LandingPage from "./components/LandingPage/LandingPage";
import {Redirect, Switch, Route } from "react-router";
import DogDetail from "./components/DogDetail/DogDetail";
import AddDog from "./components/AddDog/AddDog";
import NavBar from "./components/NavBar/NavBar";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home">
          <NavBar />
          <Dogs />
        </Route>
        <Route exact path="/add" component={AddDog} />
        <Route exact path="/:id" component={DogDetail} />
        <Redirect to='/home' />
      </Switch>
    </div>
  );
}

export default App;
