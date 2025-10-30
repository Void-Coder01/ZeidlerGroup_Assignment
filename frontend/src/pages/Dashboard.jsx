import { useContext } from "react"
import { AddTodoButton } from "../components/AddTodoButton.jsx"
import { Header } from "../components/Header.jsx"
import { userContext } from "../store/user.context.jsx"
import { Form } from "../components/Form.jsx"

export const  Dashboard = () => {
    const { showForm } = useContext(userContext);
    return (
        <div>
            <Header />
            <div className="bg-orange-50 h-screen p-5">
                <AddTodoButton />
                {showForm && <Form />}

            </div>
        </div>
    )
}