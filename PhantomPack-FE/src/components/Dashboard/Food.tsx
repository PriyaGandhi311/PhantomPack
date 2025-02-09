import { useState } from 'react';
import './Food.css';

// Define the type for food item
type FoodItem = {
  id: number;
  image: string;
  name: string;
  donatedBy: string;
};

// Props for the Food component
type FoodProps = {
  items: FoodItem[];
};

const Food = ({ items }: FoodProps) => {
  const [showAll, setShowAll] = useState(false);
  const initialItemsToShow = 4; // Number of cards to show initially

  const visibleItems = showAll ? items : items.slice(0, initialItemsToShow);

  return (
    <div className="food">
      <h3>Food</h3>
      <div className="cards-container">
        {visibleItems.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="food-image" />
            <p>Item: {item.name}</p>
            <p>Donated by: {item.donatedBy}</p>
          </div>
        ))}
      </div>
      {items.length > initialItemsToShow && (
        <button onClick={() => setShowAll(!showAll)} className="show-more-button">
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default Food;