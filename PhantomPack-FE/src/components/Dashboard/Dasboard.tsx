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
            {/* Header */}
            <header className="dashboard-header">
            <Link to="/">
                <img src="/image.png" alt="Dashboard Logo" className="dashboard-logo" />
            </Link>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="button-group">
                    {isAuthenticated && (
                        <>
                            <Link to="/donate" className="button donate-button">
                                Donate
                            </Link>
                            <Link
                                to="/profile"
                                className="button profile-button"
                            >
                                Profile
                            </Link>
                        </>
                    )}
                    <Link
                        to="/therapy-chat"
                        className="button therapy-chat-button"
                    >
                        Therapy Chat
                    </Link>
                    <AuthButton />
                </div>
            </header>

            {/* Main Content */}
            <div className="main-content">
                <UpForGrabs searchQuery={searchQuery} />
                <Leaderboard />
            </div>
        </div>
    );
};

export default Dashboard;
