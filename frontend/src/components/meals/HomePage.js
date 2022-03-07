import React from "react";
import Meal from "./Meal";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading";

export default function HomePage() {
  const URL = "/api/meals";

  const { data: mealData, loaded } = useAxios(URL);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <div className="Home">
      {mealData.meals.map((meal) => (
        <Meal key={meal.idMeal} data={meal} />
      ))}
    </div>
  );
}
