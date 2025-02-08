import './Leaderboard.css';

const Leaderboard = () => {
  const topUsers = [
    { name: 'User1', points: 1500 },
    { name: 'User2', points: 1200 },
    { name: 'User3', points: 1000 },
    { name: 'User4', points: 800 },
    { name: 'User5', points: 500 },
  ];

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {topUsers.map((user, index) => (
          <li key={index}>
            {user.name} - {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;