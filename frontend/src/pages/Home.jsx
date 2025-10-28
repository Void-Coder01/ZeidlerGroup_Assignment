import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-orange-50 h-screen flex flex-col justify-center items-center">
            <p className="mb-4 text-6xl font-semibold text-orange-900">WELCOME TO TODOWALLAH</p>
            <p className="text-orange-500 text-lg mb-10">Keep your tasks organized, stay productive</p>


            <div className="gap-5 flex">
                <button onClick = {() => navigate('/signup')} className="bg-orange-500 px-6 py-3 rounded text-white hover:bg-orange-600">
                    Get Started</button>
                <button onClick={() => navigate('/login')} className="border-2 border-orange-200 px-6 py-3 rounded">Login</button>
            </div>
        </div>
    )
}




