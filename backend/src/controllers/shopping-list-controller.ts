import { Request, Response } from 'express';
import { ShoppingList } from '../models/shopping-list';

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await ShoppingList.find().populate('items');
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lists', error });
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newList = new ShoppingList({ name });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: 'Error creating list', error });
  }
};

export const getList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await ShoppingList.findById(id).populate('items');
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching list', error });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await ShoppingList.findByIdAndDelete(id);
    //
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list', error });
  }
};
