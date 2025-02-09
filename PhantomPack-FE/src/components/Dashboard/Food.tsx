import { useState } from 'react';
import './Food.css';
import { Link } from 'react-router-dom';


import React from 'react';
import './Food.css';
interface FoodItem {
    image: string;
    item_name: string;
    item_id: string;
    category: string;
    donor_name: string;
  }
interface FoodProps {
  items: FoodItem[];
}

const Food: React.FC<FoodProps> = ({ items }) => {
  return (
    <div className="food-section">
      <h3 className="section-title">Food</h3>
      <div className="food-grid">
        {items.map((item) => (
          <Link to={"/item/"+item.item_id} >
          <div key={item.item_id} className="food-card">
            {item.image ? (
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="food-image"/>
            ) : (
              <p>No image available</p>
            )}
            <div className="food-details">
              <h4 className="food-name">{item.item_name}</h4>
              <p className="donated-by">Donated by: {item.donor_name}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Food;