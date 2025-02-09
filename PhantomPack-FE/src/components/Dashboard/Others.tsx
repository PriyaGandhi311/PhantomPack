import './Others.css';
import {useState} from 'react';
interface OthersItems {
  image: string;
  item_name: string;
  item_id: string;
  category: string;
  donor_name: string;
}

type OthersProps = {
  items:OthersItems[]
}

const Accessories = ({items} : OthersProps) => {
 
  const [showAll, setShowAll] = useState(false);
  const initialItemsToShow = 4;

  const visibleItems = showAll ? items : items.slice(0, initialItemsToShow);

  return (
    <div className="others">
      <h3>Accessories</h3>
      <div className="cards-container">
        {visibleItems.map((item)=>(
          <div key={item.item_id} className="card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="others-image"/>
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