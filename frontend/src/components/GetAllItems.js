import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
const GetAllItems = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>

     <ItemList fetchItems={fetchItems} items={items}/>

    </div>
  );
};

export default GetAllItems;
