import { useState } from 'react';
import './Food.css';
import { Link } from 'react-router-dom';
// Define the type for food item
interface FoodItem {
  image: string;
  item_name: string;
  item_id: string;
  category: string;
  donor_name: string;
}

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
          <Link to={"/item/"+item.item_id} >
         
          <div key={item.item_id} className="card">
             {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="food-image"/>
            ) : (
              <p>No image available</p>
            )}
            <p>Item: {item.item_name}</p>
            <p>Donated by: {item.donor_name}</p>
          </div>
          </Link>
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