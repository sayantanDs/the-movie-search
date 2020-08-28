import {useState, useEffect, useRef} from 'react';
import axios from 'axios';


export default function useCachedApiCall(API_KEY, path_prefix="") {
    const cache = useRef({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [response, setResponse] = useState(null);    

    const apiCall = (api_path) => {
        if(api_path)
        {
            console.log("API req:", api_path);
            if(cache.current[api_path])
            {
                console.log("Getting data from cache...", cache.current[api_path])
                setError(false);
                setErrorMsg("");
                setResponse(cache.current[api_path]);
            }
            else
            {
                setLoading(true);
                setError(false);
                setErrorMsg("");
                setResponse(null);

                // setTimeout(()=>{setResponse(placeholder);setLoading(false);},1000);
                

                axios.get(`${path_prefix}${api_path}&api_key=${API_KEY}`)
                .then((res)=>{
                    cache.current[api_path] = res.data;
                    setResponse(res.data);
                })
                .catch((err)=>{
                    setError(true);
                    console.log("[API ERROR]", err.message, err);
                    setErrorMsg(err.message);
                })
                .then(()=>setLoading(false))
            }

            
        }
        else
        {
            setError(true);
            setErrorMsg("API Request was empty!");
        }
        
    }


    return {loading, error, errorMsg, response, apiCall};
}