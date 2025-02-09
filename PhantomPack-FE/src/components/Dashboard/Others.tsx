import './Others.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
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
    <div className="others-section">
      <h3 className="section-title">Others</h3>
      <div className="accessories-grid">
        {visibleItems.map((item)=>(
          <Link to={"/item/"+item.item_id} >
          <div key={item.item_id} className="others-card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="others-image"/>
            ) : (
              <p>No image available</p>
            )}
            <div className="others-details">
              <h4 className='others-name'>{item.item_name}</h4>
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