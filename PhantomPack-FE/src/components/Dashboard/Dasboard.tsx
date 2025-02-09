// // import { useAuth0 } from "@auth0/auth0-react";
// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import AuthButton from "./AuthButton";
// // import "./Dashboard.css";
// // import Leaderboard from "./Leaderboard";
// // import UpForGrabs from "./UpForGrabs";

// // const Dashboard = () => {
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const { isAuthenticated } = useAuth0();

// //     return (
// //         <div className="dashboard">
// //             <header>
// //                 <input
// //                     type="text"
// //                     placeholder="Search..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                 />
// //                 <div className="button-group">
// //                     <Link to="/donate" className="donate-button">
// //                         Donate
// //                     </Link>
// //                     {isAuthenticated ? (
// //                         <Link to="/profile" className="profile-button">
// //                             Profile
// //                         </Link>
// //                     ) : null}
// //                     <AuthButton />
// //                 </div>
// //             </header>
// //             <div className="main-content">
// //                 <UpForGrabs />
// //                 <Leaderboard />
// //             </div>
// //         </div>
// //     );
// // };

// // export default Dashboard;


// import { useAuth0 } from "@auth0/auth0-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import AuthButton from "./AuthButton";
// import "./Dashboard.css";
// import Leaderboard from "./Leaderboard";
// import UpForGrabs from "./UpForGrabs";

// const Dashboard = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const { isAuthenticated } = useAuth0();

//     return (
//         <div className="dashboard">
//             <header>
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <div className="button-group">
//                     <Link to="/donate" className="donate-button">
//                         Donate
//                     </Link>
//                     {isAuthenticated ? (
//                         <Link to="/profile" className="profile-button">
//                             Profile
//                         </Link>
//                     ) : null}
//                     <Link to="/therapy-chat" className="therapy-chat-button">
//                         Therapy Chat
//                     </Link>
//                     <AuthButton />
//                 </div>
//             </header>
//             <div className="main-content">
//                 <UpForGrabs />
//                 <Leaderboard />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

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
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="button-group">
                    <Link to="/donate" className="button donate-button">
                        Donate
                    </Link>
                    {isAuthenticated && (
                        <Link to="/profile" className="button profile-button">
                            Profile
                        </Link>
                    )}
                    <Link to="/therapy-chat" className="button therapy-chat-button">
                        Therapy Chat
                    </Link>
                    <AuthButton />
                </div>
            </header>

            {/* Main Content */}
            <div className="main-content">
                <UpForGrabs />
                <Leaderboard />
            </div>
        </div>
    );
};

export default Dashboard;