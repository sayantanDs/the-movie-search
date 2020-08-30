import React from 'react';
import {Link} from 'react-router-dom';
import RatingRing from "../RatingRing/RatingRing";
import {getGenreNames }from "../../utilities";
import {get_poster_url} from "../../utilities";
import "./MovieCard.css";

const MovieCard = ({movie, media_type}) => {
    const title = movie.title || movie.name || movie.original_title || movie.original_name;
    const rating_percent = ("vote_average" in movie) ? (parseFloat(movie.vote_average)*10) : null;
    const release_date = movie.release_date || movie.first_air_date;
    const release_year = release_date && release_date.substr(0, 4);
    
    const _media_type = movie.media_type || media_type;
    const link = (movie.id && _media_type)? `/${_media_type}/${movie.id}` : "";

    return ( 
        <div className="movie-card">
            <div style={{position:"relative"}}>
                {"vote_count" in movie && movie.vote_count!==0 && rating_percent!==null &&
                    <span className="movie-card_vote" style={{position:"absolute", top:"-10px", right:"-10px"}}>
                        <RatingRing size={42} percent={rating_percent}/>
                    </span>
                }
                <Link to={ link } className="link-nostyle">
                    <div className="poster movie-card_poster">
                        {movie.poster_path && <img src={get_poster_url(movie.poster_path)} alt=""/>}
                    </div>
                </Link>
                <div className="movie-card_info">
                    {title && <div className="movie-card_title">{title}</div>}
                    <div className="movie-card_genres">
                        {movie.genre_ids && movie.genre_ids.map(getGenreNames).filter(v=>v!==null).map((genre,i)=><span key={i}>{genre}</span>)}
                    </div>
                    {release_year && <div className="movie-card_release">{release_year}</div>}
                  
                </div>  
            </div>        
                      
        </div>
    );
}
 
export default MovieCard;