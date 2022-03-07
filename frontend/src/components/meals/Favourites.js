import Meal from "./Meal";
import useFavourites from "../../hooks/useFavourites";

export default function Favourites() {
  const { favourites, reset } = useFavourites();

  return (
    <div className="favourites">
      <h1 className="favourites-text">Your favourites:</h1>
      <button className="reset" onClick={reset}>
        Unlike all of my favourites
      </button>
      {favourites ? (
        favourites.map((meal) => <Meal key={meal.idMeal} data={meal} />)
      ) : (
        <h1> You don't have favourites yet. </h1>
      )}
    </div>
  );
}
