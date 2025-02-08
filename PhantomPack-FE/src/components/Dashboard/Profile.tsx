import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-details">
        <img src="https://via.placeholder.com/150" alt="Profile" />
        <p>Name: John Doe</p>
        <p>Contact: +1234567890</p>
        <p>Email: john.doe@example.com</p>
        <p>Address: 123 Main St, City</p>
        <p>Points: 1000</p>
        <button>Order History</button>
      </div>
    </div>
  );
};

export default Profile;