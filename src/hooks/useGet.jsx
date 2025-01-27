import { useEffect, useState } from "react";

export const useGet = (url, token) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {

    async function fetchData(){
        setIsLoading(true);

        const options = {
          headers: token ? {
            'Authorization' : `Bearer ${token}`
          } : {}
        }

        try {
          const data = await fetch(url, options);
          const res = await data.json();
          setData(res);
          
        } catch (err) {
          setError(err);
    
        } finally {
          setIsLoading(false);
        }
    }

    fetchData();

  }, [url]);
  return { data, error, isLoading };
};

