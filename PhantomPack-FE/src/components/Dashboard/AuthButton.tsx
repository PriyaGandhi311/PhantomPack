import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const AuthButton: React.FC = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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
