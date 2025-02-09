import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css'; // Reuse the dashboard styles

type Order = {
  id: string;
  item_id: string;
  item_name: string;
  user_id: string;
  image?: string;
  description: string;
  donor_id?: string;
  receiver_id?: string;
  verified: boolean;
};

const OrderHistory = () => {
  const [donatedItems, setDonatedItems] = useState<Order[]>([]);
  const [receivedItems, setReceivedItems] = useState<Order[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (!user?.sub) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${user.sub}`);
        const data = await response.json();
        console.log(data);
        setDonatedItems(data.donated);
        setReceivedItems(data.received);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user?.sub]);

  const handleVerifyClick = async (itemId: string, receiverId?: string) => {
    if (!receiverId) {
      console.error("Receiver ID is missing");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/transact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: itemId,
          receiver_id: receiverId,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Error:", data.error);
        return;
      }
  
      console.log("Transaction successful:", data);
      alert(`Transaction successful! You earned ${data.points_earned} points.`);
    } catch (error) {
      console.error("Error verifying transaction:", error);
    }
  };
  

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
                <Link to={`/item/${item.item_id}`}>
                  {item.image && (
                    <img 
                      src={`data:image/jpeg;base64,${item.image}`} 
                      alt={item.item_name} 
                      className="item-image"
                    />
                  )}
                  <div className="item-details">
                    <h4>{item.item_name}</h4>
                    <p>{item.description}</p>
                  </div>
                </Link>
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
                <Link to={`/item/${item.item_id}`}>
                  {item.image && (
                    <img 
                      src={`data:image/jpeg;base64,${item.image}`} 
                      alt={item.item_name} 
                      className="item-image"
                    />
                  )}
                  <div>
                    <h4>{item.item_name}</h4>
                    <p>{item.description}</p>
                  </div>
                </Link>
                <button 
                  className="verify-button" 
                  onClick={() => handleVerifyClick(item.item_id, item.receiver_id)}
                  disabled={item.verified}
                >
                  {item.verified ? "Verified" : "Verify"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;