import { useState } from 'react';
import './DonateForm.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';



const DonateForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('food');
  const [images, setImages] = useState<File[]>([]);
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate user
    if (!user || !user.sub) {
      alert('User information is missing. Please log in again.');
      return;
    }

    // Validate expiry date for food items
    if (category === 'food' && !expiryDate) {
      alert('Expiry date is required for food items.');
      return;
    }

    // Validate images
    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    setIsSubmitting(true); // Start loading

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('expiry_date', expiryDate);
    formData.append('description', description);
    formData.append('donor_id', user.sub);
    images.forEach((image) => formData.append('image', image));

    try {
      const response = await fetch('http://localhost:5000/donate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Donation submitted successfully!');
       
        handleCancel();
      } else {
        const errorData = await response.json();
        alert(`Failed to submit donation: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('An error occurred while submitting the donation. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the Dashboard
  };

  return (
    <div className="donate-form-overlay">
      <div className="donate-form">
        <h2>Donate an Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="accessories">Accessories</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              required
              disabled={isSubmitting}
            />
          </div>

          {category === 'food' && (
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Donate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;