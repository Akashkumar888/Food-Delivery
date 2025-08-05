import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFood = category === "All"
  ? food_list
  : food_list.filter(item => item.category.toLowerCase() === category.toLowerCase());
  
  return (
    <div className='food_display' id='food_display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFood.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay;
