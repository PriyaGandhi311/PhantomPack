import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import "./AuthButton.css";

const AuthButton: React.FC = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user && !isRegistered) {
            registerUser(user);
        }
    }, [isAuthenticated, user, isRegistered]);

    const registerUser = async (userData: any) => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userData.sub,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone || "",
                    address: userData.address || "",
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to register user");
            }
            console.log("Registration response:", data);
            setIsRegistered(true); // Mark user as registered
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user. Please try again.");
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <button
                    className="logout-button"
                    onClick={() =>
                        logout({
                            logoutParams: { returnTo: window.location.origin },
                        })
                    }
                >
                    Logout
                </button>
            ) : (
                <button
                    className="login-button"
                    onClick={() => loginWithRedirect()}
                >
                    Login / Signup
                </button>
            )}
        </>
    );
};

export default AuthButton;
