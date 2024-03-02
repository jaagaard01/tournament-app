import { useState } from "react";

type UsePostOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

// Make UsePostResult also generic over U to match the postData method signature
type UsePostResult<T, U> = {
  loading: boolean;
  error: Error | null;
  postData: (body: U, url: string) => Promise<T | null>;
};

// Now UsePostResult is generic over both T and U
function usePost<T, U>(options?: UsePostOptions<T>): UsePostResult<T, U> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: U, url: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    const builtUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`;

    try {
      const response = await fetch(builtUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: T = await response.json();
      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occurred"));
      options?.onError?.(
        error instanceof Error ? error : new Error("An error occurred")
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData };
}

export default usePost;
