import React, {useState, useEffect} from 'react';
import useCachedApiCall from "../../CustomHooks/useCachedApiCall";
import RatingRing from "../RatingRing/RatingRing";
import MovieCard from "../MovieCard/MovieCard";
import {get_poster_url, get_backdrop_url, get_profile_url, format_date} from "../../utilities";
import "./MoviePage.css";

import {movie_details_placeholder} from "../../placeholders";


// the top thingy with backdrop image and poster, calling it dashboard..
const Dashboard = ({movie}) => {
    
    const backdrop_style = {
        backgroundImage: (movie.backdrop_path)?(`url("${get_backdrop_url(movie.backdrop_path, 2)}"), `+"linear-gradient(transparent, rgb(30,30,40) 50%, black)"):"linear-gradient(transparent, black)",
        backgroundBlendMode: "overlay"
    }

    return (
        <div style={backdrop_style} className="backdrop movie-page_dashboard"> 
                        
            <div className="movie-page_dashboard-poster-section">
                <div className="movie-page_dashboard-poster">
                    {movie.poster_path && <img src={get_poster_url(movie.poster_path, 2)} alt="movie poster"/>}
                </div>
            </div>
            <div className="movie-page_dashboard-info">
                                
                
                <div className="movie-page_title">{movie.title || movie.original_title || movie.original_name}</div>
                {movie.genres && <div className="movie-page_genres">{movie.genres.map((g, i)=><span key={i}>{g.name}</span>)}</div>}
                
                <div className="my-3">
                    {movie.release_date && <div>{format_date(movie.release_date)}</div>}
                    {movie.runtime && <div>{movie.runtime} mins</div>}
                    {movie.spoken_languages && <div>{movie.spoken_languages.map((l)=>l.name).join(", ")}</div>}
                </div>
                
                

                {/* <div>IMDb: 6.9</div> */}
                <div className="py-2">
                    <RatingRing size={50} percent={parseFloat(movie.vote_average)*10}/>
                </div>                    
                
            </div> 
        </div>
    );
}

const CastList = ({credits}) => {
    const cast_list = credits && credits.cast;
    const cast_list_limit = 5;

    return (
        <React.Fragment>
        {cast_list &&
            <div className="section">
                <div className="section-heading">Cast</div>                
                <ul className="cast-list">
                    {
                        cast_list.map((cast, i)=>{
                            if(i<cast_list_limit){
                                return (
                                    <li key={i}>
                                        <img src={get_profile_url(cast.profile_path)} alt=""/>
                                        {cast.name}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        }
        </React.Fragment>        
    );
}



const MoviePage = ({match}) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id;
    const movieData = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");
    const movie = movieData.response;
    // const movie = movie_details_placeholder;    
    
    useEffect(()=>{
        movieData.apiCall(`/movie/${id}?append_to_response=credits,external_ids,videos,recommendations,similar,reviews`);
    },[match.params.id]);

    

    return ( 
        <React.Fragment>
            {movieData.loading && <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>}
            {movieData.error && 
            <div className="text-center">
                <div className="error-msg">{(movieData.errorMsg)? movieData.errorMsg: "Something went wrong!"}</div>
                {/* <button onClick={reload} className="btn btn-sm btn-light mt-4">Reload</button> */}
            </div>
            }
            {movie &&
                <div>
                    <Dashboard movie={movie}/>
                    <div className="movie-page_layout-grid"> 
                        <div className="section">
                            <div className="section-heading">Plot</div>
                            <div>{movie.overview}</div>                                
                        </div> 
                        <CastList credits={movie.credits}/> 
                    </div> 
                    
                    {/*--------------------- Recommended section------------------------- */}
                    {movie.recommendations && movie.recommendations.results &&
                        <div className="section">
                            <div className="section-heading">You may also like</div>
                            <div className="movie-list">
                                {movie.recommendations.results.map((m, i)=><MovieCard key={i} movie={m} media_type="movie"/>)}
                            </div>                            
                        </div>                        
                    }

                    {movie.similar && movie.similar.results &&
                        <div className="section">
                            <div className="section-heading">Similar</div>
                            <div className="movie-list">
                                {movie.similar.results.map((m, i)=><MovieCard key={i} movie={m}  media_type="movie"/>)}
                            </div>                            
                        </div>                        
                    }
                    
                </div>
            } 
        </React.Fragment>
    );
}
 
export default MoviePage;