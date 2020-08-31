import React, {useState, useEffect} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "./MovieSearchPage.css";

const SearchBar = ({searchQuery, mediaType, setSearchQuery, setMediaType}) => {
    const [searchInput, SetSearchInput] = useState(searchQuery);
    const [mediaTypeInput, SetmediaTypeInput] = useState(mediaType);

    const onSearch = (e) => {
        e.preventDefault();
        console.log("submitted", searchInput);
        setSearchQuery(searchInput);
        setMediaType(mediaTypeInput);
    }

    return (
        <div>
            <form onSubmit={onSearch} className="search-form">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <select className="btn btn-light" value={mediaTypeInput} onChange={(e)=>SetmediaTypeInput(e.target.value)}>
                      <option value="movie">Movie</option>
                      <option value="tv">Series</option>
                  </select> 
                </div>
                <input className="form-control" type="text" placeholder="Search by title" value={searchInput} onChange={(e)=>SetSearchInput(e.target.value)} required/>
                <div className="input-group-append">
                <button className="btn btn-light search-btn" type="submit">
                  <svg width="1.1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </button>
                </div>
              </div>
                 
            </form>
        </div>
    );
}

const Pagination = ({totalPages, currentPage, setCurrentPage})=>{

    const prevPage = ()=>{
      console.log("prev");
      setCurrentPage(Math.max(1, currentPage-1));
    }
    const nextPage = ()=>{
      console.log("next");
      setCurrentPage(Math.min(totalPages, currentPage+1));
    }
  
      
    if(totalPages){
      let neighbours = 2;
      let from_num = Math.max(1, currentPage-neighbours);
      let n_r = neighbours + (neighbours-(currentPage-from_num));
      let to_num = Math.min(totalPages, currentPage+n_r);
      let n_l = neighbours + (neighbours - (to_num-currentPage));
      from_num = Math.max(1, Math.min(from_num, currentPage-n_l));
      let rangeArr = [];
      for(let i=from_num; i<=to_num;i++){rangeArr.push(i);}
  
      return (        
        <ul className="movie-search-pagination pagination justify-content-center">
          
            <li className={(currentPage===1)?"page-item disabled":"page-item"}>
              <button className="page-link" onClick={prevPage}>&laquo;</button>
            </li>  
            {(from_num>1) && <li className="page-item"> <button className="page-link" onClick={()=>setCurrentPage(1)}>1</button></li>}
            {(from_num>2) && <li className="page-item disabled"> <div className="page-link">..</div></li>}
            {rangeArr.map((pnum)=>(
              <li key={pnum} className={(currentPage==pnum)?"page-item active":"page-item"}>
                <button className="page-link" onClick={()=>setCurrentPage(pnum)}>{pnum}</button>
              </li>
            ))}
            {(to_num<totalPages-1) && <li className="page-item disabled"> <div className="page-link">..</div></li>}
            {(to_num<totalPages) && <li className="page-item"> <button className="page-link" onClick={()=>setCurrentPage(totalPages)}>{totalPages}</button></li>}
    
            <li className={(currentPage===totalPages)?"page-item disabled":"page-item"}>
              <button className="page-link" onClick={nextPage}>&raquo;</button>
            </li>
                
        </ul>
      );
    }
    else{return null}
    
  }

const MovieSearchPage = ({movieSearch}) => {
    
    const searchAPI = movieSearch.searchAPI;
    const movies = (searchAPI.response && searchAPI.response.results);
    const totalPages = (searchAPI.response && searchAPI.response.total_pages);


    return ( 
        <div>
            <SearchBar setSearchQuery={movieSearch.setSearchQuery} 
                        setMediaType={movieSearch.setMediaType} 
                        searchQuery={movieSearch.searchQuery} 
                        mediaType={movieSearch.mediaType}/>
            <Pagination totalPages={totalPages} 
                        currentPage={movieSearch.page} 
                        setCurrentPage={movieSearch.setPage}/>
            
            {searchAPI.loading && <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>}
            
            {searchAPI.error && 
            <div className="text-center">
                <div className="error-msg">{(searchAPI.errorMsg)? searchAPI.errorMsg: "Something went wrong!"}</div>
                <button onClick={movieSearch.performAPICall} className="btn btn-sm btn-light mt-4">Reload</button>
            </div>}
            
            <div className="movie-grid">
                {movies && movies.map(movie=><MovieCard key={movie.id} movie={movie} media_type={movieSearch.mediaType}/>)}            
            </div>

            <Pagination totalPages={totalPages} 
                        currentPage={movieSearch.page} 
                        setCurrentPage={movieSearch.setPage}/>

        </div>
    );
}
 
export default MovieSearchPage;