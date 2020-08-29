import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import useCachedApiCall from "./CustomHooks/useCachedApiCall";
import useMovieSearch from "./CustomHooks/useMovieSearch";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage/HomePage";
import MoviePage from "./components/MoviePage/MoviePage";
import MovieSearchPage from "./components/MovieSearchPage/MovieSearchPage";


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const trendingData = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");
  const movieSearch = useMovieSearch();

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Navbar/>
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={props=><HomePage {...props} trendingData={trendingData}/>}/>
            <Route exact path="/:media_type/:id" 
                  render={(props)=>{
                      switch(props.match.params.media_type){
                        case "movie":
                        case "tv":
                          return <MoviePage {...props}/>
                        default:
                          return <Redirect to="/"/>
                      }
                  }}
            />
            <Route exact path="/search" render={props=><MovieSearchPage {...props} movieSearch={movieSearch}/>}/>
          </Switch>       
        </main>
      </div>
    </Router>
    
  );
}

export default App;
