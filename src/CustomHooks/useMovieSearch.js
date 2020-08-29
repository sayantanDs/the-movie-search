import {useState, useEffect} from 'react';
import useCachedApiCall from "./useCachedApiCall";


export default function(){
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const [mediaType, setMediaType] = useState("movie");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const searchAPI = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");
    
    const performAPICall = () => {
        if(searchQuery){
            const api_query = `/search/${mediaType}?query=${searchQuery}&page=${page}&include_adult=false&language=en-US`;
            console.log("[Use Movie Search] ", api_query);
            searchAPI.apiCall(api_query);
        }
    }

    useEffect(()=>{
        performAPICall();        
    },[searchQuery, page, mediaType]);


    return {mediaType, setMediaType, searchQuery, setSearchQuery, page, setPage, performAPICall, searchAPI};

}