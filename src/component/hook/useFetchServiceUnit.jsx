import { useState, useEffect } from 'react';

const useFetchList = (url) => {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();  // Parse the JSON data
        
        setData(result);  // Update state with the fetched data

        
      } catch (error) {
        setError(error.message);  // Update error state if something goes wrong
      } finally {
        setLoading(false);  // Set loading to false after the request completes
      }
    };

    fetchData();  // Call the fetch function when the hook is used
  }, [url]);  // The hook will re-run if the URL changes

  return { data, loading, error };  // Return data, loading state, and error state
};

export default useFetchList;
