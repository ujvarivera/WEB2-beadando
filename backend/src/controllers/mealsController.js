import { meals } from "../meals.js"

export const getAllMeals = async(req, res) => {
    res.json(meals)
}

export const getSearchedMeal = async(req, res) => {
    const { name } = req.params
    const searched = []
    try {
        for (let meal of meals.meals) {
            if (meal.strMeal.toLowerCase().includes(name.toLowerCase())) {
                searched.push(meal)
            }
        }
        res.json({ meals: searched })
    }  catch (error) {
        res.json({ message: "not found" })
    }
    }
