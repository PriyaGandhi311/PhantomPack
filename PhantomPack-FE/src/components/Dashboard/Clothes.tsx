import { useState } from 'react';
import './Clothes.css';
import { Link } from 'react-router-dom';

interface ClothesItem {
  image: string;
  item_name: string;
  item_id: string;
  category: string;
  donor_name: string;
}

type ClothesProps = {
  items : ClothesItem[]
}

const Clothes = ({items}: ClothesProps) => {

  const [showAll, setShowAll] = useState(false);
  const initialItemsToShow = 4;

  const visibleItems = showAll ? items : items.slice(0, initialItemsToShow);


  return (
    <div className="clothes">
      <h3>Clothes</h3>
      <div className="cards-container">
        {visibleItems.map((item)=>(
          <Link to={"/item/"+item.item_id} >
          <div key={item.item_id} className="card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="clothes-image"/>
            ) : (
              <p>No image available</p>
            )}
            <p>{item.item_name}</p>
            <p>Donated by: {item.donor_name}</p>
          </div>
          </Link>
        ))}
      </div>
      <div>
        {items.length > initialItemsToShow && (<button onClick={()=> setShowAll(!showAll)} className="show-more-button">
          {showAll ? 'Show Less' : 'Show More'}
        </button>)}
      </div>
    </div>
  );
};

export default Clothes;