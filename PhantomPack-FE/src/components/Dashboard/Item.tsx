import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./Item.css";

interface Item {
    item_id: string;
    category: string;
    description: string;
    expiry_date?: string; // Optional field
    donor_name: string;
    image: string; // Binary image data as a base64 string
    item_name: string;
    receiver_id: string;
}

const Item: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { user } = useAuth0();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/items/${id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setItem(data);
                } else {
                    setError("Item not found.");
                }
            } catch (error) {
                setError("An error occurred while fetching the item.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleRequest = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/items/request/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        receiver_id: user?.sub, // Get from your auth system
                    }),
                }
            );

            if (response.ok) {
                alert(
                    "Item requested successfully, you can view it in your order history"
                );
                window.location.reload();
            } else {
                const data = await response.json();
                alert(data.error || "Failed to request item");
            }
        } catch (error) {
            alert("An error occurred while requesting the item");
            console.error(error);
        }
    };

    return (
        <div className="item-details">
            {item?.image ? (
                <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.item_name}
                    className="item-image"
                />
            ) : (
                <div className="item-image no-image">No image available</div>
            )}
            <div className="item-content">
                <div className="item-category">{item?.category}</div>
                <h1 className="item-name">{item?.item_name}</h1>
                <p className="item-description">{item?.description}</p>
                {item?.expiry_date && (
                    <p className="item-expiry-date">
                        Expires on {item.expiry_date}
                    </p>
                )}
                <p className="item-donor">
                    <strong>Donated by:</strong> {item?.donor_name}
                </p>
                <button
                    className="request-button"
                    onClick={handleRequest}
                    disabled={item?.receiver_id !== null}
                >
                    {item?.receiver_id ? "Already Claimed" : "Request Item"}
                </button>
            </div>
        </div>
    );
};

export default Item;
