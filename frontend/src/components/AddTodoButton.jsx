import { Plus } from 'lucide-react'
import { useContext } from 'react'
import { userContext } from '../store/user.context'


export const AddTodoButton = () => {
    const { setShowForm } = useContext(userContext);
    return (
        <div className="max-w-6xl flex justify-between mx-auto">
            <h2 className='text-2xl font-semibold'>My Tasks</h2>
            <button className='flex gap-2 border rounded-2xl px-3 py-2 bg-orange-500 text-white items-center cursor-pointer '
                onClick={() => {setShowForm(s => !s)}}
            >
                <Plus className='size-5'/>
                Add Task
            </button>
        </div>
    )
}