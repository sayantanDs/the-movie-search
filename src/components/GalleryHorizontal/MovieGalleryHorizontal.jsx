import React, {useRef, useEffect} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import GalleryHorizontal from "./GalleryHorizontal";

const MovieGalleryHorizontal = ({movies, media_type}) => {
    
    const makeMovieList = () => {
        return movies.map((movie, i)=><MovieCard movie={movie} media_type={media_type} key={i}/>)
    }

    return GalleryHorizontal(makeMovieList());
}
 
export default MovieGalleryHorizontal;