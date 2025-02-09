import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import "./Profile.css";

const Profile = () => {
    const { user } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (user?.sub) {
                    const response = await fetch(
                        `http://localhost:5000/profile/${user.sub}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch profile data");
                    }
                    const data = await response.json();
                    setPhoneNumber(data.phone || "");
                    setAddress(data.address || "");
                    setPoints(data.points || 0);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Failed to load profile data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    const handleSave = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/profile/${user?.sub}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone: phoneNumber,
                        address: address,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save changes");
            }

            setIsEditing(false);
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    if (loading) {
        return <div className="profile">Loading...</div>;
    }

    if (error) {
        return <div className="profile">{error}</div>;
    }

    return (
        <div className="profile">
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        src={user?.picture || "https://via.placeholder.com/150"}
                        alt="Profile"
                    />
                    <div className="profile-info">
                        <h2>
                            {user?.username || user?.name}
                            <span
                                className="edit-icon"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                ✏️
                            </span>
                        </h2>
                        <p>{user?.email || "john.doe@example.com"}</p>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="detail">
                        <label>Phone Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        ) : (
                            <span>{phoneNumber}</span>
                        )}
                    </div>
                    <div className="detail">
                        <label>Address:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        ) : (
                            <span>{address}</span>
                        )}
                    </div>
                    <div className="points-container">
                        <span className="points-label">Points:</span>
                        <span className="points-value">{points}</span>
                    </div>
                </div>
                <div className="actions">
                    {isEditing ? (
                        <button className="save-button" onClick={handleSave}>
                            Save Changes
                        </button>
                    ) : (
                        <button className="order-history-button">
                            Order History
                        </button>
                    )}
                    <AuthButton />
                </div>
            </div>
        </div>
    );
};

export default Profile;
