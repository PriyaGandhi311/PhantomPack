import React from 'react';

interface ItemCardProps {
  category: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ category }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative">
        <img
          src="/placeholder-item.jpg"
          alt="Item"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-white mb-2">Sample Item</h4>
        <p className="text-gray-400 mb-4">Sample description</p>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out w-full">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;