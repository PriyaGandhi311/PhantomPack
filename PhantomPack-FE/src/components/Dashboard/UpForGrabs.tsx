import Food from './Food';
import Clothes from './Clothes';
import Accessories from './Accessories';
import Others from './Others';
import './UpForGrabs.css';

const UpForGrabs = () => {
  // Example food items
  const foodItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      name: 'Fresh Apples',
      donatedBy: 'User123',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      name: 'Organic Bananas',
      donatedBy: 'User456',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/200',
      name: 'Whole Grain Bread',
      donatedBy: 'User789',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Organic Spinach',
      donatedBy: 'User101',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      name: 'Almond Milk',
      donatedBy: 'User202',
    },
  ];

  const clothesItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      name: 'Fresh Apples',
      donatedBy: 'User123',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      name: 'Organic Bananas',
      donatedBy: 'User456',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/200',
      name: 'Whole Grain Bread',
      donatedBy: 'User789',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Organic Spinach',
      donatedBy: 'User101',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      name: 'Almond Milk',
      donatedBy: 'User202',
    },
  ]
  const accessoriesItems = [{
    id: 5,
    image: 'https://via.placeholder.com/150',
    name: 'Almond Milk',
    donatedBy: 'User202',
  },
]

const othersItems = [{
  id: 5,
  image: 'https://via.placeholder.com/150',
  name: 'Almond Milk',
  donatedBy: 'User202',
},
]
  return (
    <div className="up-for-grabs">
      <h2>Up For Grabs</h2>
      <div className="sections">
        <Food items={foodItems} />
        <Clothes items = {clothesItems} />
        <Accessories items = {accessoriesItems}/>
        <Others items = {othersItems} />
      </div>
    </div>
  );
};

export default UpForGrabs;