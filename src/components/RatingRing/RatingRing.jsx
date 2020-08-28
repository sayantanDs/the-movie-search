import React from 'react';
import "./RatingRing.css";

const RatingCircle = ({percent, size}) => {


    percent = percent || 0;
    const stroke_width = 3;
    const sby2 = size/2; 
    const radius = sby2 - stroke_width-1;
    const circumference = 2 * radius * Math.PI;
    const font_size = size/3.3;

    const getColor = (percent) => {
        if(percent>=75){return "hsl(102, 65%, 60%)"}
        else if(percent>=50){return "hsl(46, 65%, 60%)"}
        else if(percent>=25){return "hsl(26, 65%, 60%)"}
        else {return "hsl(9, 57%, 43%)"}
    }

    return ( 
        <div className="rating-ring_wrapper" style={{width: size}}>
            <svg height={size} width={size} className="rating-ring">            
                <circle cx={sby2} cy={sby2} r={sby2} fill="rgb(28, 28, 33)"/>
                <circle className="rating-ring_circle"
                    cx={sby2} cy={sby2}
                    r={radius}
                    strokeWidth={stroke_width}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference - ((percent/100)*circumference)}
                    fill="transparent"
                    stroke={getColor(percent)}
                />
            </svg>
            <div className="rating-ring_percent" style={{fontSize: font_size, marginTop:"-0.3em"}}>
                {percent} 
                <span style={{fontSize:font_size/2}}> %</span>
            </div>
        </div>
    );
}
 
export default RatingCircle;