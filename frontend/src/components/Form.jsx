import { X } from 'lucide-react';
import { useContext } from 'react';
import { useState } from "react"
import { userContext } from '../store/user.context';
import axios from 'axios';

export const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDAte] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const { setShowForm,getTodo } = useContext(userContext);

    const URL = "http://localhost:5000/user"

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDAte('');
        setDueTime('');
        setShowForm(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!title){
            alert('title is required')
            return;
        }

        let due_Date_time = null;

        if(dueDate){
            if(dueTime){
                const dateTimeString = `${dueDate}T${dueTime}:00`;
                const dateAndTime = new Date(dateTimeString);
                due_Date_time = dateAndTime.toISOString();    
            }else{
                alert("Please provide a due time")
                return;
            }
        }

        const todoData = {
            title : title,
            description : description || null,
            due_date : due_Date_time,
            isCompleted : false
        }


        try {
            if(editingTodo){
                await axios.post(`${URL}/update/${editingTodo._id}`, todoData, {
                    withCredentials :true
                })
            }else{
                await axios.post(`${URL}/todo`, todoData, {
                    withCredentials:true
                })
            }

            resetForm();
            getTodo();
        } catch (error) {
            console.error("Erro while adding todo", error);
            alert("Failed to save todo");
        }
    }

    return (
        <div className="bg-white rounded-lg mb-6 shadow-xl p-6 max-w-6xl mx-auto backdrop-blur-xl mt-5">
            <div className="flex justify-between">
                <h3 className="text-lg">{editingTodo ? "Edit Task" : "Add Task"}</h3>
                <button onClick={resetForm}>
                    < X className='size-5'/>
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                    <input type="text" placeholder='Title' value={title} 
                    onChange={(e) => {setTitle(e.target.value)}}  
                    className='outline-none w-full border-b focus:border-orange-500'/>
                </div>


                <div className='mt-4'>
                    <textarea name="description" id="description" 
                    className='border pb-2 outline-none focus:border-orange-500 w-full '
                    placeholder='Description' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>


                <div className="flex gap-9 mt-4">
                    <div>
                        <p className="block text-sm  ">Due Date</p>
                        <input type="date" value={dueDate}
                            onChange={(e) => setDueDAte(e.target.value)}
                            className="w-full border rounded p-2 outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <p className="block text-sm  ">Due Time</p>
                        <input type="time" value={dueTime}
                            onChange={(e) => {setDueTime(e.target.value)}}
                            className="w-full border rounded p-2 outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className='flex gap-3 mt-4'>
                    <button type="submit" className='rounded bg-orange-500 text-white outline-none px-4 py-2'>submit</button>
                    <button onClick={resetForm} className='border-orange-500 border px-4 py-2'>Cancel</button>
                </div>

            </form>
        </div>
    )
}