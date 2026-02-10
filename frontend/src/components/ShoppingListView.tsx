import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getList, addItem, updateItem, deleteItem } from '../services/api';
import type { ShoppingList, ShoppingItem } from '../types';

export const ShoppingListView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => {
        if (id) {
            loadList(id);
        }
    }, [id]);

    const loadList = async (listId: string) => {
        try {
            const data = await getList(listId);
            setList(data);
        } catch (error) {
            console.error('Failed to load list', error);
        }
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName.trim() || !id) return;
        try {
            const newItem = await addItem(id, newItemName);
            if (list) {
                setList({ ...list, items: [...list.items, newItem] });
            }
            setNewItemName('');
        } catch (error) {
            console.error('Failed to add item', error);
        }
    };

    const handleToggleBought = async (item: ShoppingItem) => {
        try {
            const updatedItem = await updateItem(item._id, !item.bought);
            if (list) {
                setList({
                    ...list,
                    items: list.items.map(i => i._id === item._id ? updatedItem : i)
                });
            }
        } catch (error) {
            console.error('Failed to update item', error);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            await deleteItem(itemId);
            if (list) {
                setList({
                    ...list,
                    items: list.items.filter(i => i._id !== itemId)
                });
            }
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    if (!list) return <div>Wird geladen...</div>;

    return (
        <div className="container">
            <Link to="/" className="back-link">← Zurück zu den Listen</Link>
            <h1>{list.name}</h1>

            <form onSubmit={handleAddItem} className="create-form">
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Neuer Artikel"
                />
                <button type="submit">Artikel hinzufügen</button>
            </form>

            <ul className="shopping-list">
                {list.items.map((item) => (
                    <li key={item._id} className={item.bought ? 'bought' : ''}>
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={item.bought}
                                onChange={() => handleToggleBought(item)}
                            />
                            <span className="item-name">{item.name}</span>
                        </label>
                        <button onClick={() => { handleDeleteItem(item._id); }} className="delete-btn">×</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
