import { useState, useEffect } from 'react';
import './OrderHistory.css'; // Reuse the dashboard styles

type Order = {
  id: string;
  itemName: string;
  date: string;
  status: string;
  type: 'donated' | 'received';
  imageUrl?: string;
};

const OrderHistory = () => {
  const [donatedItems, setDonatedItems] = useState<Order[]>([]);
  const [receivedItems, setReceivedItems] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch donated items from backend
    const fetchDonated = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/orders/donated');
        const data = await response.json();
        setDonatedItems(data);
      } catch (error) {
        console.error('Error fetching donated items:', error);
      }
    };

    // Fetch received items from backend
    const fetchReceived = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/orders/received');
        const data = await response.json();
        setReceivedItems(data);
      } catch (error) {
        console.error('Error fetching received items:', error);
      }
    };

    fetchDonated();
    fetchReceived();
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h2>Order History</h2>
      </header>
      
      <div className="main-content">
        <div className="order-section">
          <h3>Items You Donated</h3>
          {donatedItems.length === 0 ? (
            <p>No donated items found</p>
          ) : (
            donatedItems.map((item) => (
              <div key={item.id} className="order-item-card">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                )}
                <div className="item-details">
                  <h4>{item.itemName}</h4>
                  <p>Donated on: {new Date(item.date).toLocaleDateString()}</p>
                  <p>Status: {item.status}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="order-section">
          <h3>Items You Received</h3>
          {receivedItems.length === 0 ? (
            <p>No received items found</p>
          ) : (
            receivedItems.map((item) => (
              <div key={item.id} className="order-item-card">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                )}
                <div className="item-details">
                  <h4>{item.itemName}</h4>
                  <p>Received on: {new Date(item.date).toLocaleDateString()}</p>
                  <p>Status: {item.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;