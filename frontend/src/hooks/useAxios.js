import axios from "axios";
import { useState, useEffect } from "react";
import useFavourites from "../hooks/useFavourites";

const useAxios = (url) => {
  const { data, setData } = useFavourites();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const download = async () => {
      const { data } = await axios.get(url);
      setData(data);
      setLoaded(true);
    };

    download();
  }, [url]);
  return { data, loaded };
};

export default useAxios;
