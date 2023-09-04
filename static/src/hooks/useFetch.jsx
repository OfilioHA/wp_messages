import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url, config = {}){

    const axiosDefault = {
        baseURL: '/api'
    };

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [data, setData] = useState([]);

    const instance = axios.create({
        ...axiosDefault,
        ...config
    });
    
    const forceReload = ()=> setReload((old)=> !old);

    const call = async (url, config = {})=> {
        
        let response = null;
        
        try{
            setLoading(true);
            response = await instance.request({
                url,
                ...config
            });
        }catch(error){
            
            

        }finally{
            setLoading(false);
        }

        return {
            response                
        }
    };

    useEffect(()=>{
        (async function(){
            if(!url) return; 
            let response = await call(url, config);
            setResponse(response.response);
            setData(response.response.data);
        })();
    }, [reload, config.params?.page]);

    return {
        response,
        loading,
        data,
        call,
        forceReload
    }

}