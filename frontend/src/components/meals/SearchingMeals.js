import React, { useState } from "react";
import Meal from "./Meal";
import Input from "./Input";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading";
import HomePage from "./HomePage";

export default function SearchingMeals() {
  const url = "/api/meals/";
  const [foodName, setFoodName] = useState("");
  const [foodUrl, setFoodUrl] = useState("");

  const { data: foodData, loaded } = useAxios(foodUrl);

  const handleChange = (event) => {
    setFoodName(event.target.value);
  };

  const search = (url) => {
    if (foodName !== "") {
      setFoodUrl(url + foodName);
    } else {
      alert("You have to write in something!");
    }
    setFoodName("");
  };

  if (!loaded) {
    return <Loading />;
  }

  const isMealSearched = () => {
    if (foodUrl === "") {
      return <HomePage />;
    }
  };

  return (
    <div className="home">
      <Input
        foodName={foodName}
        handleChange={handleChange}
        search={search}
        url={url}
      />
      {isMealSearched()}
      {foodData.meals &&
        foodData.meals.map((meal) => <Meal key={meal.idMeal} data={meal} />)}
    </div>
  );
}