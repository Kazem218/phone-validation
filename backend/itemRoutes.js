const express = require('express');
const axios = require('axios');
const router = express.Router();
const ItemModel = require('./itemModel');
const { v4: uuidv4 } = require('uuid');

// Route to create a new item
router.post('/items', async (req, res) => {
    const { name, description, mobileNumber } = req.body;

    if (!name || !description || !mobileNumber) {
        return res.status(400).json({ error: 'Name and description and mobileNumber are required' });
    }

    let item;

    if (mobileNumber) {
        try {
            const validationResponse = await axios.post('http://localhost:5000/validate', { mobileNumber });

            if (validationResponse.status !== 200) {
                return res.status(400).json({ error: 'Invalid mobile number' });
            }

            const { countryCode, countryName, operatorName } = validationResponse.data;
            item = {
                id: uuidv4(), // Generate a unique id
                name,
                description,
                mobileNumber,
                countryCode,
                countryName,
                operatorName
            };
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while validating the mobile number', error: error });
        }
    } else {
        item = { id: uuidv4(), name, description };
    }

    try {
        await ItemModel.saveItem(item);
        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error(`Could not save item: ${error}`);
        return res.status(500).json({ 
            error: 'An error occurred while saving the item',
            message: error
         });
    }
});

// Route to update an existing item by id
router.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;

    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ error: 'Name and description and mobileNumber are required' });
        }
        const result = await ItemModel.updateItem(id, updatedItem);
        if (result) {
            return res.status(200).json({ message: 'Item updated successfully', item: result });
        } else {
            return res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`Could not update item: ${error}`);
        return res.status(500).json({ error: 'An error occurred while updating the item' });
    }
});

// Route to delete an item by id
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ItemModel.deleteItem(id);
        if (result) {
            return res.status(200).json({ message: 'Item deleted successfully', item: result });
        } else {
            return res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`Could not delete item: ${error}`);
        return res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
});

// Route to get all items
router.get('/items', async (req, res) => {
    try {
        const items = await ItemModel.getAllItems();
        return res.status(200).json(items);
    } catch (error) {
        console.error(`Could not get items: ${error}`);
        return res.status(500).json({ error: 'An error occurred while retrieving items' });
    }
});

module.exports = router
