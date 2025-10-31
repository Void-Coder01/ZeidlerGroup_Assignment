import { useEffect, useState } from "react"
import { AddTodoButton } from "../components/AddTodoButton.jsx"
import { Header } from "../components/Header.jsx"
import { Form } from "../components/Form.jsx"
import axios from "axios"
import { TodoCard } from "../components/TodoCard.jsx"

export const  Dashboard = () => {
    const [todo, setTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    const URL = "http://localhost:5000/user";

    useEffect(() => {
        fetchTodo();
    }, []);


    const fetchTodo = async() => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${URL}/my-todo`, {
                withCredentials: true
            });
            setTodo(response.data.todos );
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setIsLoading(false);
        }
    }

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setShowForm(true);
    }

    const onCancel = () => {
        setShowForm(false);
        setEditingTodo(null);

    }

     const onSuccess = () => {
        fetchTodo(); 
    };

    const handleDelete = async (id) => {

        try {
            await axios.delete(`${URL}/delete/${id}`, {
                withCredentials: true
            });
            fetchTodo();
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert(error.response?.data?.msg || 'Failed to delete todo');
        }
    };

    const handleToggleComplete = async (todo) => {
        try {
            await axios.patch(`${URL}/complete/${todo._id}`, {}, {
                withCredentials: true
            });
            fetchTodo();
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-orange-50 h-screen p-5">
                <AddTodoButton setShowForm={setShowForm}/>
                {showForm && <Form editingTodo={editingTodo} onCancel={onCancel} onSuccess={onSuccess}/>}

                 <TodoCard
                    todo={todo}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                />
            </div>
        </div>
    )
}