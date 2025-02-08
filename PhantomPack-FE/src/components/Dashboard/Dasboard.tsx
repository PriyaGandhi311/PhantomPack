import { useState } from 'react';
import { Link } from 'react-router-dom';
import UpForGrabs from './UpForGrabs';
import Leaderboard from './Leaderboard';
import './Dashboard.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="dashboard">
      <header>
        <Link to="/profile" className="profile-button">Profile</Link>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="donate-button">Donate</button>
        <button className="logout-button">Log Out</button>
      </header>
      <UpForGrabs />
      <Leaderboard />
    </div>
  );
};

export default Dashboard;