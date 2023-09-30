import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useCallback, useEffect, useState } from 'react'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getMeals = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        'https://erg35tews-default-rtdb.firebaseio.com/menu.json'
      )
      if (!response.ok) {
        throw new Error('smth went wrong')
      }
      const data = await response.json()

      const receivedMeals = []
      for (const key in data) {
        receivedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(receivedMeals)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getMeals()
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (error) {
    content = <p>{error}</p>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
