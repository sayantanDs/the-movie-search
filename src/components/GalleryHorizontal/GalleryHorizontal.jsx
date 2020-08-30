import React, {useEffect, useRef} from 'react';
import "./GalleryHorizontal.css";

const GalleryHorizontal = (component) => {
    const scrollArea = useRef();

    // useEffect(()=>{
    //     scrollArea.current.scrollLeft += 20;
    // },[]);

    const scroll_offset = 100;
    const onLeft = () => {
        let current_pos =  scrollArea.current.scrollLeft;
        let w = scrollArea.current.clientWidth;
        let scroll_amount = w - ((w > (scroll_offset*2))?scroll_offset:0);
        scrollArea.current.scrollTo({left: current_pos - scroll_amount, behavior: "smooth"});
    }
    const onRight = () => {
        let current_pos =  scrollArea.current.scrollLeft;
        let w = scrollArea.current.clientWidth;
        let scroll_amount = w - ((w > (scroll_offset*2))?scroll_offset:0);
        scrollArea.current.scrollTo({left: current_pos + scroll_amount, behavior: "smooth"});
    }

    return ( 
        <div className="gallery-h">
            <button onClick={onLeft}><div className="gallery-left-arrow"></div></button>
            <div ref={scrollArea} className="gallery-h-scrollarea">               
                {component}
            </div>
            <button onClick={onRight}><div className="gallery-right-arrow"></div></button>
        </div>
    );
}
 
export default GalleryHorizontal;