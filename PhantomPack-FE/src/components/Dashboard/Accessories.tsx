import './Accessories.css';
import {useState} from 'react';
type AccessoriesItems = {
  id: number;
  image : string;
  name: string;
  donatedBy: string,
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
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className='accessories-image'/>
            <p>{item.name}</p>
            <p>Donated by: {item.donatedBy}</p>
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