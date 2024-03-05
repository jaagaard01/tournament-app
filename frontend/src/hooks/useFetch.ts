import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const jsonData: T = await response.json();
        setData(jsonData);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
