import Food from './Food';
import Clothes from './Clothes';
import Accessories from './Accessories';
import Others from './Others';
import './UpForGrabs.css';

const UpForGrabs = () => {
  return (
    <div className="up-for-grabs">
      <h2>Up For Grabs</h2>
      <div className="sections">
        <Food />
        <Clothes />
        <Accessories />
        <Others />
      </div>
    </div>
  );
};

export default UpForGrabs;