import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLists, createList, deleteList } from '../services/api';
import type { ShoppingList } from '../types';

export const ShoppingListCollection: React.FC = () => {
    const [lists, setLists] = useState<ShoppingList[]>([]);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        loadLists();
    }, []);

    const loadLists = async () => {
        try {
            const data = await getLists();
            setLists(data);
        } catch (error) {
            console.error('Failed to load lists', error);
        }
    };

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        try {
            const newList = await createList(newListName);
            setLists([...lists, newList]);
            setNewListName('');
        } catch (error) {
            console.error('Failed to create list', error);
        }
    };

    const handleDeleteList = async (listId: string) => {
        try {
            await deleteList(listId);
            setLists(lists.filter(list => list._id !== listId));
        } catch (error) {
            console.error('Failed to delete list', error);
        }
    };

    return (
        <div className="container">
            <h1>Einkaufsliste</h1>
            <form onSubmit={handleCreateList} className="create-form">
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Gebe einen Namen ein"
                />
                <button type="submit">Neue Liste erstellen</button>
            </form>
            <div className="list-grid">
                {lists.map((list) => (
                    <Link to={`/lists/${list._id}`} key={list._id} className="list-card">
                        <h3>{list.name}</h3>
                        <p>{list.items.length} Artikel</p>
                        <button onClick={(e) => { e.preventDefault(); handleDeleteList(list._id); }} className="delete-btn">×</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};
