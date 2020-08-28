import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import useCachedApiCall from "./CustomHooks/useCachedApiCall";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage/HomePage";
import MoviePage from "./components/MoviePage/MoviePage";
import SeriesPage from "./components/SeriesPage/SeriesPage";


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const trendingData = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");


  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Navbar/>
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={props=><HomePage {...props} trendingData={trendingData}/>}/>
            <Route exact path="/movie/:id" render={props=><MoviePage {...props}/>}/>
            <Route exact path="/tv/:id" render={props=><SeriesPage {...props}/>}/>
          </Switch>       
        </main>
      </div>
    </Router>
    
  );
}

export default App;
