import React from "react";
import Meal from "./Meal";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";

export default function HomePage() {
  const char = "b";
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + char;

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
