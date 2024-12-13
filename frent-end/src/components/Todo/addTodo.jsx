import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddTodo = ({ refreshTodos }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onSubmit',
    });

    const [completed, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const addTodo = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/api/todo/add", {
                title: data.addt,
                description: data.description,
                iscomplete: completed,
            });
            refreshTodos();
            reset();
            setCompleted(false);
            setErrorMessage("");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error adding todo:", error.response ? error.response.data : error.message);
            setErrorMessage("Failed to add todo. Please try again.");
        }
    };

    const onSubmit = (data) => {
        addTodo(data);
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            <h5>Add New Todo</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Todo Title</label>
                                    <input
                                        type="text"
                                        {...register('addt', { required: 'Title is required' })}
                                        className={`form-control ${errors.addt ? 'is-invalid' : ''}`}
                                        placeholder="Enter your todo title"
                                    />
                                    {errors.addt && <div className="invalid-feedback">{errors.addt.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        {...register('description', { required: 'Description is required' })}
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        rows="3"
                                        placeholder="Enter a brief description"
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        id="completedCheck"
                                        checked={completed}
                                        onChange={(e) => setCompleted(e.target.checked)}
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="completedCheck">Mark as Completed</label>
                                </div>

                                {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Add Todo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
