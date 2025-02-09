import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dasboard'
import DonateForm from './components/Dashboard/DonateForm';
import OrderHistory from './components/Dashboard/OrderHistory';
import Profile from './components/Dashboard/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/donate" element={<DonateForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;