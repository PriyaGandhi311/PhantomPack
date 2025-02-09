import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import "./Dashboard.css";
import Leaderboard from "./Leaderboard";
import UpForGrabs from "./UpForGrabs";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { isAuthenticated } = useAuth0();

    return (
        <div className="dashboard">
            <header>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="button-group">
                    <Link to="/donate" className="donate-button">
                        Donate
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/profile" className="profile-button">
                            Profile
                        </Link>
                    ) : null}
                    <Link to="/therapy-chat" className="therapy-chat-button">
                        Therapy Chat
                    </Link>
                    <AuthButton />
                </div>
            </header>
            <div className="main-content">
                <UpForGrabs searchQuery={searchQuery} />
                <Leaderboard />
            </div>
        </div>
    );
};

export default Dashboard;