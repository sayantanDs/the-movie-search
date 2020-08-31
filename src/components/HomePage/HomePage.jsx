import React, { useState, useEffect } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "./HomePage.css";

import {trending_movie_list_placeholder} from "../../placeholders";


const TrendingSection = ({trendingData})=>{
  const [timeWindow, setTimeWindow] = useState("day");
  const [mediaType, setMediaType] = useState("movie");

  useEffect(()=>{
    trendingData.apiCall(`/trending/${mediaType}/${timeWindow}?`);
  }, [timeWindow, mediaType])

  const reload = ()=>{
    console.log("reloading...");
    trendingData.apiCall(`/trending/${mediaType}/${timeWindow}?`);
  }

  return (      
    <div className="section">
        <div className="section-heading trending-section-heading">
          <div>Popular</div>           
          <select onChange={(e)=>setTimeWindow(e.target.value)}>
            <option value="day">Today</option>
            <option value="week">This Week</option>
          </select>
          <div className="btn-group">
            <button className={"btn"+((mediaType==="movie")?" selected":"")} onClick={()=>setMediaType("movie")}>Movie</button>
            <button className={"btn"+((mediaType==="tv")?" selected":"")} onClick={()=>setMediaType("tv")}>Series</button>
          </div>
        </div>
        {/* <p>{timeWindow}, {mediaType}</p> */}
                
        {trendingData.loading && <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>}
        {trendingData.error && 
          <div className="text-center">
            <div className="error-msg">{(trendingData.errorMsg)? trendingData.errorMsg: "Something went wrong!"}</div>
            <button onClick={reload} className="btn btn-sm btn-light mt-4">Reload</button>
          </div>
        }
        <div className="movie-grid">
          {trendingData.response && trendingData.response.results && trendingData.response.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)}
          {/* {trending_movie_list_placeholder.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)} */}
        </div>
    </div>
  );
}


const HomePage = ({trendingData}) => {
  
    return ( 
        <div className="homepage">
            <TrendingSection trendingData={trendingData}/>            
        </div>
    );
}
 
export default HomePage;