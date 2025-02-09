import { useState, useEffect } from 'react';
import './OrderHistory.css'; // Reuse the dashboard styles
import { useAuth0 } from '@auth0/auth0-react';

type Order = {
  id: string;
  item_name: string;
  user_id: string;
  image?: string;
  description: string;
  donor_id?: string;
  receiver_id?: string;
};

const OrderHistory = () => {
  const [donatedItems, setDonatedItems] = useState<Order[]>([]);
  const [receivedItems, setReceivedItems] = useState<Order[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (!user?.sub) return; // Ensure user is authenticated

    // Fetch donated and received items from backend
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${user.sub}`);
        const data = await response.json();
        console.log(data.donated)
        // Set donated and received items
        setDonatedItems(data.donated);
        setReceivedItems(data.received);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user?.sub]);

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
                {item.image && (
                  <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="item-image"/>
                )}
                <div className="item-details">
                  <h4>{item.item_name}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="order-section">
          <h3>Items You Requested</h3>
          {receivedItems.length === 0 ? (
            <p>No received items found</p>
          ) : (
            receivedItems.map((item) => (
              <div key={item.id} className="order-item-card">
                {item.image && (
                  <img src={`data:image/jpeg;base64,${item.image}`} alt={item.item_name} className="item-image"/>
                )}
                <div className="item-details">
                  <h4>{item.item_name}</h4>
                  <p>{item.description}</p>
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