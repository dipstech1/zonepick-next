import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = `${publicRuntimeConfig.apiUrl}`;;

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = async (params) => {
      try {
       const result = await axios.request(params);
       setResponse(result.data);
       } catch( error ) {
         setError(error);
       } finally {
        setloading(false);
       }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []); // execute once only

    return { response, error, loading };
};

export default useAxios;