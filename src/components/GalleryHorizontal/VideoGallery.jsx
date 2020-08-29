import React from 'react';
import GalleryHorizontal from "./GalleryHorizontal"



const VideoGallery = ({videos}) => {
    const makevideoList = ()=>{
        return videos.map((vid, i)=>{
                    if(vid.site === "YouTube" && vid.key){
                        return (
                            <div key={i}>
                                <iframe
                                    width="356" height="200" 
                                    src={`https://www.youtube.com/embed/${vid.key}`}
                                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen>
                                </iframe>
                            </div>
                        );
                    }
                });
    }

    return GalleryHorizontal(makevideoList());      
}
 
export default VideoGallery;