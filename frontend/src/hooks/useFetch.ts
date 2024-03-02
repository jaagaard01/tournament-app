import { useEffect, useState } from "react";

// Use a generic type T to allow specifying the data shape
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null); // Data can be of type T or null
  const [isLoading, setIsLoading] = useState<boolean>(true); // Explicitly state the boolean type for clarity
  const [error, setError] = useState<string | null>(null); // Error state is a string or null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const jsonData: T = await response.json(); // Cast the response to type T
        setData(jsonData);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(err.message); // Ensure err is an instance of Error to access message
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
