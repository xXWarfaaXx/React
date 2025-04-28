import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/tasks")
            .then(res => {
                setTasks(res.data);
            });
    }, []);

    const handleAddTask = () => {
        if (newTask) {
            axios.post("http://localhost:8080/task", newTask)
                .then(() => {
                    setTasks([...tasks, newTask]);
                    setNewTask("");
                });
        }
    };

    const handleDeleteTask = (index) => {
        axios.delete(`http://localhost:8080/task?index=${index}`)
            .then(() => {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
            });
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
