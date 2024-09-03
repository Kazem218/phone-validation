// src/components/AddItemCard.js
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import axios from 'axios';

const AddItemCard = ({ onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || description === "" || mobileNumber === ""){

      alert("Please enter all values");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/items', {
        name,
        description,
        mobileNumber
      });
      if (response.status === 201) {
        alert('Item successfully created!');
        onCreate(); // Refresh the list after creating a new item
        onClose(); // Hide the card after creation
        setName('');
        setDescription('');
        setMobileNumber('');
      } else {
        alert('Failed to create the item');
        console.error('Failed to create the item');
      }
    } catch (error) {
        alert('Error creating item!');
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title ml-3"><b>Add New Item</b></h5>
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number </label>
        
            <div>
              <PhoneInput
              id="mobileNumber"
              name="mobileNumber"
              defaultCountry="lb"
              value={mobileNumber}
              onChange={(mobileNumber) => setMobileNumber(mobileNumber)}
              required
            />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <button 
              type="submit"
              className="btn btn-success me-2"
            >
              <i className="bi bi-plus-circle pr-1"></i> 

              Add Item
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddItemCard;

