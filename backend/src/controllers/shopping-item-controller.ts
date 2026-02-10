import { Request, Response } from 'express';
import { ShoppingItem } from '../models/shopping-item';
import { ShoppingList } from '../models/shopping-list';

export const addItem = async (req: Request, res: Response) => {
    try {
        const { listId } = req.params;
        const { name } = req.body;

        const list = await ShoppingList.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const newItem = new ShoppingItem({ name });
        await newItem.save();

        list.items.push(newItem._id);
        await list.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { bought } = req.body;

        const updatedItem = await ShoppingItem.findByIdAndUpdate(
            id,
            { bought },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedItem = await ShoppingItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Also remove reference from any list
        await ShoppingList.updateMany(
            { items: id },
            { $pull: { items: id } }
        );

        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
