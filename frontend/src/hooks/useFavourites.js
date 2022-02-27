import { useContext } from "react";
import { Context } from "../context/FavouritesContext";

export default function useFavourites() {
  const context = useContext(Context);
  return context;
}
