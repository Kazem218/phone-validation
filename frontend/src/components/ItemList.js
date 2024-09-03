import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateItemCard from './CreateItemCard';
import UpdateItemOverlay from './UpdateItemOverlay'; // Import the overlay component

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item to update
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Error fetching items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/items/${id}`);
      if (response.status === 200) {
        fetchItems(); // Refresh the list after deletion
        alert('Item deleted successfully!');
      } else {
        console.error('Failed to delete the item');
        setError('Failed to delete the item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item');
    }
  };

  const handleUpdateClick = (item) => {
    setSelectedItem(item); // Set the selected item to update
  };

  const handleCloseOverlay = () => {
    setSelectedItem(null); // Close the overlay when done
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-5">
      <div className='row'>
        <div className='col-md-4 d-flex justify-content-start align-items-center'>
          <h1 className="text-center mb-3">Items List</h1>
        </div>
        <div className='col-md-4'></div>
        <div className='col-md-4 d-flex justify-content-end align-items-center'>
          <button className="btn btn-info me-2" onClick={fetchItems}>
            <i className="text-white bi bi-arrow-clockwise"></i>
          </button>
          <button
            className="btn btn-success"
            onClick={() => setShowCreateCard(!showCreateCard)}
          >
            <i className={showCreateCard ? "bi bi-x-circle" : "bi bi-plus-circle"}></i>
            {showCreateCard ? ' Close Form' : ' Create Item'}
          </button>
        </div>
      </div>

      {showCreateCard && (
        <CreateItemCard
          onCreate={fetchItems}
          onClose={() => setShowCreateCard(false)}
        />
      )}

      <div className="table-container">
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Country Code</th>
                <th>Country Name</th>
                <th>Operator Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.countryCode}</td>
                  <td>{item.countryName}</td>
                  <td>{item.operatorName}</td>
                  <td>{item.description}</td>
                  <td className="d-flex justify-content-between">
                    <button
                      className=" text-white btn btn-warning w-50 me-2 d-flex align-items-center justify-content-center"
                      onClick={() => handleUpdateClick(item)}
                    >
                      <i className="fas fa-edit fs-6"></i>
                    </button>
                    <button
                      className="btn btn-danger w-50 d-flex align-items-center justify-content-center"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fas fa-trash-alt fs-6"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <UpdateItemOverlay
          item={selectedItem} // Pass the selected item to the overlay
          onClose={handleCloseOverlay} // Close the overlay
          onUpdate={fetchItems} // Refresh the list after updating
        />
      )}
    </div>
  );
};

export default ItemList;
