import axios from "axios";
import { useState } from "react";

//asi se hace una peticion asincronica usando hooks de una api
const useFetch = () => { 

    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const getApi = url => {
        axios.get(url)
            .then(res => {
                setHasError(false);
                setApiData(res.data);
            })
            .catch(err => {
                setHasError(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return[apiData, getApi,isLoading, hasError]; 
 }
 

export default useFetch;

