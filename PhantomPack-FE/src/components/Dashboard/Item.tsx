import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

interface Item {
    item_id: string;
    category: string;
    description: string;
    expiry_date?: string; // Optional field
    donor_name: string;
    image: string; // Binary image data as a base64 string
    item_name: string;
}

const Item: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract id from URL parameters
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/items/${id}` // Use id from URL
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

    return (
        <div className="item-details">
            {item?.image ? (
                <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.item_name}
                    className="food-image"
                />
            ) : (
                <p>No image available</p>
            )}
            <h2 className="item-category">{item?.category}</h2>
            <h2 className="item-category">{item?.item_name}</h2>
            <p className="item-description">{item?.description}</p>
            {item?.expiry_date && (
                <p className="item-expiry-date">
                    <strong>Expiry Date:</strong> {item.expiry_date}
                </p>
            )}
            <p className="item-donor">
                <strong>Donor Name:</strong> {item?.donor_name}
            </p>
        </div>
    );
};

export default Item;
