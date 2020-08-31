import React, {useState, useEffect} from 'react';
import useCachedApiCall from "../../CustomHooks/useCachedApiCall";
import RatingRing from "../RatingRing/RatingRing";
import MovieGalleryHorizontal from "../GalleryHorizontal/MovieGalleryHorizontal";
import VideoGallery from "../GalleryHorizontal/VideoGallery";
import SeasonsGallery from "../GalleryHorizontal/SeasonsGallery";
import {get_poster_url, get_backdrop_url, get_profile_url, format_date, get_lang_name} from "../../utilities";
import male_icon from "./male-64.png";
import female_icon from "./female-64.png";
import generic_icon from "./generic.png";
import "./MoviePage.css";

import {movie_details_placeholder} from "../../placeholders";


// the top thingy with backdrop image and poster, calling it dashboard..
const Dashboard = ({movie}) => {
    const runtime = movie.runtime || movie.episode_run_time.join(", ") || "0";
    const release_date = movie.release_date || movie.first_air_date;
    const title = movie.title || movie.name || movie.original_title || movie.original_name;
    const rating_percent = ("vote_average" in movie) ? (parseFloat(movie.vote_average)*10) : null;
    
    const movie_lang = (movie.spoken_languages && movie.spoken_languages.map(lang=>(get_lang_name(lang.iso_639_1)||lang.name)));
    const tv_lang = (movie.languages && movie.languages.map(get_lang_name));
    const languages = (movie_lang || tv_lang);
    
    const seasons = movie.number_of_seasons && (`${movie.number_of_seasons} Season${(movie.number_of_seasons>1)?"s":""}`);
    
    const backdrop_style = {
        backgroundImage: (movie.backdrop_path)?(`url("${get_backdrop_url(movie.backdrop_path, 2)}"), linear-gradient(transparent, rgb(30,30,40) 50%, black)`):"linear-gradient(transparent, black)",
        backgroundBlendMode: "overlay"
    }

    return (
        <div style={backdrop_style} className="backdrop movie-page_dashboard"> 
                        
            <div className="movie-page_dashboard-poster-section">
                <div className="poster-bg">
                    {movie.poster_path && <img src={get_poster_url(movie.poster_path, 2)} alt="movie poster"/>}
                </div>
            </div>
            <div className="movie-page_dashboard-info">
                                
                {/* <div>IMDb: 6.9</div> */}
                {rating_percent &&
                <div className="py-2">
                    <RatingRing size={50} percent={rating_percent}/>
                </div>}
            
                <div className="my-3">
                    {release_date && <div>{format_date(release_date)}</div>}
                    {runtime!=0 && <div>{runtime} mins</div>}
                    {languages && <div>{languages.join(", ")}</div>}
                    {seasons && <div>{seasons}</div>}
                </div>

                {movie.genres && <div className="movie-page_genres">{movie.genres.map((g, i)=><span key={i}>{g.name}</span>)}</div>}
                <div className="movie-page_title">{title}</div>
                
                
            </div> 
        </div>
    );
}

const Profile = ({cast}) => {
    const get_profile_pic = () => {
        if(cast.profile_path)
            return get_profile_url(cast.profile_path);
        else if(cast.gender)
        {
            return (cast.gender===2)? male_icon : female_icon
        }
        else{
            return generic_icon;
        }
    }
    return <img src={get_profile_pic()} alt="" className="profile-pic"/>;
}

const FullCastCrew = ({credits}) => {
    const cast_list = credits && credits.cast;
    const crew_list = credits && credits.crew;
    return (
        <div className="modal fade" id="fullCastCrewModal">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <div className="modal-title">Cast and Crew</div>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="list-heading">Cast</div>
                        <ul className="cast-list">
                        {cast_list && cast_list.map((cast, i)=><li key={i}><Profile cast={cast}/><span className="cast-name">{cast.name}</span><span className="cast-role">{cast.character}</span></li>)}
                        </ul>
                        <div className="list-heading">Crew</div>
                        <ul className="cast-list">
                        {crew_list && crew_list.map((crew, i)=><li key={i}><Profile cast={crew}/><span className="cast-name">{crew.name}</span><span className="cast-role">{crew.job}</span></li>)}
                        </ul>
                    </div>                

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
                                        {/* <img src={get_profile_url(cast.profile_path)} alt=""/> */}
                                        <Profile cast={cast}/>
                                        {cast.name}
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
                <button className="more-cast-btn" data-toggle="modal" data-target="#fullCastCrewModal">See more...</button>
                <FullCastCrew credits={credits}/>
            </div>
        }
        </React.Fragment>        
    );
}

const VideoSection = ({videos}) => {
    return (
            <React.Fragment>
                {videos && videos.results && videos.results.length &&
                    <div className="section">
                        <div className="section-heading">Videos</div>
                        <VideoGallery videos={videos.results}/>
                    </div>
                }
            </React.Fragment>  
    );
}

const MoviePage = ({match}) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id;
    const  media_type = match.params.media_type;

    const movieData = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");
    const movie = movieData.response;
    // const movie = movie_details_placeholder;    
    
    useEffect(()=>{
        movieData.apiCall(`/${media_type}/${id}?append_to_response=credits,external_ids,videos,recommendations,similar,reviews&language=en`);
    },[match.params.id, match.params.media_type]);

    

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

                    {movie.seasons && 
                        <div className="section">
                            <div className="section-heading">Seasons</div>
                            <SeasonsGallery seasons={movie.seasons}/>
                        </div>
                    }

                    <VideoSection videos={movie.videos}/> 

                    {/*--------------------- Recommended section------------------------- */}
                    {movie.recommendations && movie.recommendations.results && movie.recommendations.results.length!==0 &&
                        <div className="section">
                            <div className="section-heading">You may also like</div>
                            <MovieGalleryHorizontal movies={movie.recommendations.results} media_type={media_type}/>
                        </div>                        
                    }

                    {movie.similar && movie.similar.results && movie.similar.results.length!==0 &&
                        <div className="section">
                            <div className="section-heading">Similar</div>
                            <MovieGalleryHorizontal movies={movie.similar.results}  media_type={media_type}/>                            
                        </div>                        
                    }
                    
                </div>
            } 
        </React.Fragment>
    );
}
 
export default MoviePage;