import useFavourites from "../../hooks/useFavourites";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export default function Meal({ data }) {
  const { favourites, like, unlike } = useFavourites();

  return (
    <div className="meal-container">
      <img src={data.strMealThumb} alt={data.strMeal} />
      <div className="meal-description">
        <h1>{data.strMeal}</h1>
        <h2>
          <a href={data.strYoutube} target="_blank" rel="noopener noreferrer">
            You can watch a video how to make it
          </a>
        </h2>
        {favourites.find((fav) => fav.idMeal === data.idMeal) ? (
          <button className="fav" onClick={() => unlike(data)}>
            <FcLike size={25} />
          </button>
        ) : (
          <button className="fav" onClick={() => like(data)}>
            <FcLikePlaceholder size={25} />
          </button>
        )}
      </div>
    </div>
  );
}
