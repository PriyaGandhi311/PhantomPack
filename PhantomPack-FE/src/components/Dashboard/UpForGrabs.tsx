import React, { useEffect, useState } from 'react';
import Accessories from './Accessories';
import Clothes from './Clothes';
import Food from './Food';
import Others from './Others';
import './UpForGrabs.css';

// Define the type for an item
interface Item {
  image: string;
  item_name: string;
  item_id: string;
  category: string;
  donor_name: string;
}

interface UpForGrabsProps {
  searchQuery: string;
}

const UpForGrabs: React.FC<UpForGrabsProps> = ({ searchQuery }) => {
  // State for each category of items
  const [foodItems, setFoodItems] = useState<Item[]>([]);
  const [clothesItems, setClothesItems] = useState<Item[]>([]);
  const [accessoriesItems, setAccessoriesItems] = useState<Item[]>([]);
  const [othersItems, setOthersItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/items')
      .then((response) => response.json())
      .then((data: Item[]) => {
        // Filter items based on category
        const food = data.filter((item) => item.category === 'food');
        const clothes = data.filter((item) => item.category === 'clothes');
        const accessories = data.filter((item) => item.category === 'accessories');
        const others = data.filter((item) => item.category === 'others');
        console.log(data)
        // Update state with filtered items
        setFoodItems(food);
        setClothesItems(clothes);
        setAccessoriesItems(accessories);
        setOthersItems(others);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to filter items based on search query
  const filterItems = (items: Item[]) => {
    return items.filter((item) =>
      item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="up-for-grabs">
      <h2>Up For Grabs</h2>
      <div className="sections">
        <Food items={filterItems(foodItems)} />
        <Clothes items={filterItems(clothesItems)} />
        <Accessories items={filterItems(accessoriesItems)} />
        <Others items={filterItems(othersItems)} />
      </div>
    </div>
  );
};

export default UpForGrabs;