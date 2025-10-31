import { TodoItem } from './TodoItem';

export const TodoCard = ({ todo, isLoading, onEdit, onDelete, onToggleComplete }) => {
    if (isLoading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Loading tasks...</p>
            </div>
        );
    }

    if (todo.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center max-w-6xl mx-auto">
                <p className="text-gray-500 text-lg">Your Tasklist is Empty!!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-6xl mx-auto">
            {todo.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
};