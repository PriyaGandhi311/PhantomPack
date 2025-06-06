import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

// Define the type for a user
interface User {
  name: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [topFive, setTopFive] = useState<User[]>([]);

  // Fetch top 5 users from the backend
  useEffect(() => {
    const fetchTopFive = async () => {
      try {
        const response = await fetch('http://localhost:5000/leaderboard/top5');
        const data = await response.json();
        setTopFive(data);
      } catch (error) {
        console.error('Error fetching top 5 users:', error);
      }
    };

    fetchTopFive();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {topFive.map((user, index) => (
          <li key={index} className={index === 0 ? 'first-place' : ''}>
            <span className="rank">{index + 1}.</span>
            <span className="name">{user.name}</span>
            <span className="points">{user.points} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;