import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result.products || result);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, [url]);

  return { data, loading, error };
};
