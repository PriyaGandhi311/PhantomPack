import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import AuthButton from "./AuthButton";
import './Profile.css';

const Profile = () => {
  const { user } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+1234567890");
  const [address, setAddress] = useState("123 Main St, City");

  const handleSave = () => {
    // Save the updated phone number and address (you can add API calls here)
    console.log("Saved:", { phoneNumber, address });
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-header">
          <img src={user?.picture || "https://via.placeholder.com/150"} alt="Profile" />
          <div className="profile-info">
            <h2>
              {user?.username || user?.name}
              <span className="edit-icon" onClick={() => setIsEditing(!isEditing)}>
                ✏️
              </span>
            </h2>
            <p>{user?.email || "john.doe@example.com"}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail">
            <label>Phone Number:</label>
            {isEditing ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <span>{phoneNumber}</span>
            )}
          </div>
          <div className="detail">
            <label>Address:</label>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <span>{address}</span>
            )}
          </div>
          <div className="points-container">
            <span className="points-label">Points:</span>
            <span className="points-value">1000</span>
          </div>
        </div>
        <div className="actions">
          {isEditing ? (
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="order-history-button">Order History</button>
          )}
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;