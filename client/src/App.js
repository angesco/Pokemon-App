import './App.css';

import React from "react";
import { Route } from "react-router-dom";

// import Favorites from "./components/Favorites/Favorites";
// import landingpage from './components/Landingpage/landingpage.js'
import NavBar from "./components/Navbar/navbar.js";
import Pokemons from "./components/pokemons/pokemons.js";
// import detail from "./components/Detail/detail";

function App() {
  return (
      <React.Fragment>
          {/* <Route exact path="/" component={landingpage}/> */}
          <Route  path="/home" component={NavBar} />
          {/* <Route path="/home/favs" component={Favorites} /> */}
          <Route exact path="/home" component={Pokemons} />
          {/* <Route exact path="/home/details/:id" component={detail}/> */}

      </React.Fragment>
  );
}

export default App;