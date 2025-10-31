import { Check, Edit2, Trash2} from 'lucide-react';

export const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {

    return (
        <div className={`bg-white rounded-lg shadow p-5 ${todo.isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                    <button
                        onClick={() => onToggleComplete(todo)}
                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                            todo.isCompleted? 'bg-orange-500 ': 'border-gray-300 '
                        }`}
                    >
                        {todo.isCompleted && <Check className="size-5 text-white" />}
                    </button>

                    <div className="flex-1 max-w-4xl">
                        <h3 className={`text-lg font-semibold wrap-break-word`}>
                            {todo.title}
                        </h3>
                        {todo.description && (
                            <p className="text-gray-600  wrap-break-word whitespace-pre-wrap">{todo.description}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => onEdit(todo)}
                        className="p-2 text-orange-600"
                    >
                        <Edit2 className="size-5" />
                    </button>
                    <button
                        onClick={() => onDelete(todo._id)}
                        className="p-2 text-red-600 "
                    >
                        <Trash2 className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};