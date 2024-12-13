import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';

const GetAllTodos = () => {
    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const URL = "http://localhost:3000/api/todo/";

    const fetchTodos = async () => {
        try {
            const response = await axios.get(URL);
            setTodos(response.data);
            console.log('Fetched todos:', response.data);
            setErrorMessage("");
        } catch (error) {
            console.error("Error fetching todos:", error);
            setErrorMessage("Failed to fetch todos. Please try again.");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const displayTodos = todos.map((todo, index) => (
        <tr key={todo.id || index}>
            <td>{index + 1}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>
                <span
                    className={`badge ${todo.iscomplete ? 'bg-success' : 'bg-danger'}`}
                >
                    {todo.iscomplete ? 'Completed' : 'Pending'}
                </span>
            </td>
        </tr>
    ));

    return (
        <div className="container mt-5">
            <h2 className="text-primary mb-4 text-center">Todo List</h2>
            <AddTodo refreshTodos={fetchTodos} />
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            <div className="card mt-4 shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">Your Todos</h5>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.length > 0 ? displayTodos : (
                                <tr>
                                    <td colSpan="4" className="text-muted">
                                        No todos available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllTodos;
