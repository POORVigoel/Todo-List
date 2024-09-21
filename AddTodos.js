import React, { useState } from 'react';

function AddTodo({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        const newTodo = {
            title,
            completed: false,
        };

        onAdd(newTodo);  // Call the onAdd function passed as a prop
        setTitle('');    // Clear the input field
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default AddTodo;
