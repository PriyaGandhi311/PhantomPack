import { useState } from 'react';
import './Clothes.css';

type ClothesItem = {
  id: number,
  image: string;
  name: string,
  donatedBy: string,
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
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className='clothes-image'/>
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

export default Clothes;