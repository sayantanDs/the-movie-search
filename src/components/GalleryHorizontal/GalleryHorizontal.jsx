import React, {useEffect, useRef} from 'react';
import "./GalleryHorizontal.css";

const GalleryHorizontal = (component) => {
    const scrollArea = useRef();

    useEffect(()=>{
        scrollArea.current.scrollLeft += 20;
    },[]);

    const onLeft = () => {
        let current_pos =  scrollArea.current.scrollLeft;
        let scroll_ammount = scrollArea.current.clientWidth;
        scrollArea.current.scrollTo({left: current_pos - scroll_ammount, behavior: "smooth"});
    }
    const onRight = () => {
        let current_pos =  scrollArea.current.scrollLeft;
        let scroll_ammount = scrollArea.current.clientWidth;
        scrollArea.current.scrollTo({left: current_pos + scroll_ammount, behavior: "smooth"});
    }

    return ( 
        <div className="gallery-h">
            <button onClick={onLeft}>{"<"}</button>
            <div ref={scrollArea} className="gallery-h-scrollarea">               
                {component}
            </div>
            <button onClick={onRight}>{">"}</button>
        </div>
    );
}
 
export default GalleryHorizontal;