import React, {useRef, useEffect} from 'react';
import {get_poster_url} from "../../utilities";
import GalleryHorizontal from "./GalleryHorizontal";
import "./SeasonsGallery.css";

const SeasonCard = ({season}) => {
    return (
        <div className="season-card">
            <div className="poster">
                {season.poster_path && <img src={get_poster_url(season.poster_path)} alt=""/>}
            </div>
            <div className="season-card_info">
                {season.name && <div className="season-card_title">{season.name}</div>}
                {season.episode_count && <div className="season-card_episodes">Episodes: {season.episode_count}</div>}  
                {season.air_date && <div className="season-card_release">{season.air_date}</div>}                  
            </div>  
        </div>
    );
}

const SeasonsGallery = ({seasons}) => {
    
    const makeSeasonsList = () => {
        return seasons.map((season, i)=><SeasonCard season={season} key={i}/>);
    }

    return GalleryHorizontal(makeSeasonsList());
}
 
export default SeasonsGallery;