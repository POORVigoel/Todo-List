import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodos';  // Import the AddTodo component
import './TodoList.css'; 

function TodoList() {
    const [todos, setTodos] = useState([]);

    // Fetch todos from the API
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                setTodos(data.slice(0, 10)); // Limit to the first 10 todos
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    // Function to handle adding a new todo
    const handleAdd = async (newTodo) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });

        const addedTodo = await response.json();
        setTodos(prevTodos => [...prevTodos, addedTodo]);
    };

    // Function to handle updating a todo
    const handleUpdate = async (id) => {
        console.log('Updating todo with id:', id);
        
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) {
            console.error('Todo not found:', id);
            return;
        }

        const updatedTodoData = {
            ...todoToUpdate,
            completed: !todoToUpdate.completed, // Toggle completed status
        };

        console.log('Payload for update:', updatedTodoData);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodoData),
            });

            if (!response.ok) {
                console.error('Failed to update todo:', response.statusText);
                return;
            }

            const updatedTodo = await response.json();
            console.log('Updated Todo:', updatedTodo);

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? updatedTodo : todo // Replace the updated todo
                )
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Function to handle deleting a todo
    const handleDelete = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });

            setTodos(prevTodos =>
                prevTodos.filter(todo => todo.id !== id) // Remove the deleted todo
            );
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo onAdd={handleAdd} />
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        {todo.title}
                        <div>
                            <button onClick={() => handleUpdate(todo.id)}>Update</button>
                            <button onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
