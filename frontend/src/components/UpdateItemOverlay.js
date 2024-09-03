// src/components/UpdateItemOverlay.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateItemOverlay = ({ item, onClose, onUpdate }) => {
  const [name, setName] = useState(item.name || '');
  const [description, setDescription] = useState(item.description || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/items/${item.id}`, {
        name,
        description,
      });
      onUpdate(); // Refresh the list after updating
      onClose();  // Close the overlay
      alert('Item Updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="overlay">
  <div className="card">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h2>Update Item</h2>
      <button onClick={onClose} className="btn btn-close"></button>
    </div>
    <div className="card-body">
      <form onSubmit={handleUpdate} className="row g-3">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-warning text-white">
          <i className="fas fa-edit fs-6"></i> Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  
  );
};

export default UpdateItemOverlay;
