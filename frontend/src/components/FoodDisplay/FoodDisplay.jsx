import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Handle missing or incorrect categories safely
  const filteredFood = category === "All"
    ? food_list
    : food_list.filter(item =>
        item.category && // protect against null/undefined
        item.category.toLowerCase() === category.toLowerCase()
      );


  return (
    <div className='food_display' id='food_display'>
      <h2>Top dishes near you ({filteredFood.length})</h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item, index) => (
            <FoodItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;

