import './Accessories.css';
import {useState} from 'react';
interface AccessoriesItems {
  image: string;
  item_name: string;
  item_id: string;
  category: string;
  donor_name: string;
}

type AccessoriesProps = {
  items:AccessoriesItems[]
}

const Accessories = ({items} : AccessoriesProps) => {
 
  const [showAll, setShowAll] = useState(false);
  const initialItemsToShow = 4;

  const visibleItems = showAll ? items : items.slice(0, initialItemsToShow);

  return (
    <div className="accessories">
      <h3>Accessories</h3>
      <div className="cards-container">
        {visibleItems.map((item)=>(
          <div key={item.item_id} className="card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="accessories-image"/>
            ) : (
              <p>No image available</p>
            )}
            <p>{item.item_name}</p>
            <p>Donated by: {item.donor_name}</p>
          </div>
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

export default Accessories;