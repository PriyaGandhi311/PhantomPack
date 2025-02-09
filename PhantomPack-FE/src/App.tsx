import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dasboard';
import DonateForm from './components/Dashboard/DonateForm';
import Item from './components/Dashboard/Item';
import OrderHistory from './components/Dashboard/OrderHistory';
import Profile from './components/Dashboard/Profile';
import TherapyChat from './components/Dashboard/TherapyChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/donate" element={<DonateForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/therapy-chat" element={<TherapyChat />} />
      </Routes>
    </Router>
  );
}

export default App;