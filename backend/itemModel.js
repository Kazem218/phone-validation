const Item = require("./items.mongo");

// Function to save an item
async function saveItem(item) {
    try {
        await Item.findOneAndUpdate(
            { mobileNumber: item.mobileNumber },
            item,
            { upsert: true, new: true }
        );
        console.log("Item saved successfully");
    } catch (err) {
        console.error(`Could not save item: ${err}`);
    }
}

// Function to update an item by id
async function updateItem(id, updatedItem) {
    try {
        // Exclude _id and __v fields
        const { _id, __v, ...updateData } = updatedItem;

        const result = await Item.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
        if (result) {
            console.log("Item updated successfully");
            return result;
        } else {
            console.log("Item not found");
            return null;
        }
    } catch (err) {
        console.error(`Could not update item: ${err}`);
        throw err;
    }
}

// Function to delete an item by id
async function deleteItem(id) {
    try {
        const result = await Item.findOneAndDelete({ id });
        if (result) {
            console.log("Item deleted successfully");
            return result;
        } else {
            console.log("Item not found");
            return null;
        }
    } catch (err) {
        console.error(`Could not delete item: ${err}`);
        throw err;
    }
}

// Function to get all items
async function getAllItems() {
    try {
        const items = await Item.find({});
        return items;
    } catch (err) {
        console.error(`Could not get items: ${err}`);
        throw err;
    }
}

module.exports = {
    saveItem,
    updateItem,
    deleteItem,
    getAllItems,
};
