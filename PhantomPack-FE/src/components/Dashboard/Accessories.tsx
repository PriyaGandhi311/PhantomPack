import './Accessories.css';
import { Link } from 'react-router-dom';
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
    <div className="accessories-section">
      <h3 className="section-title">Accessories</h3>
      <div className="accessories-grid">
        {visibleItems.map((item)=>(
          <Link to={"/item/"+item.item_id} >
          <div key={item.item_id} className="accessories-card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="accessories-image"/>
            ) : (
              <p>No image available</p>
            )}
            <div className="accessories-details">
              <h4 className='accessories-name'>{item.item_name}</h4>
              <p className='donated-by'>Donated by: {item.donor_name}</p>
            </div>
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

export default Accessories;