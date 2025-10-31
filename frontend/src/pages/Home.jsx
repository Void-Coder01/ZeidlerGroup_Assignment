import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-orange-50 min-h-screen flex flex-col justify-center items-center px-4 text-center">
            <p className="mb-4 text-4xl sm:text-5xl md:text-6xl font-semibold text-orange-900 leading-tight">WELCOME TO TODOWALLAH</p>
            <p className="text-orange-500 text-base sm:text-lg md:text-xl mb-10 max-w-md">Keep your tasks organized, stay productive</p>


            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto justify-center">
                <button onClick = {() => navigate('/signup')} className="bg-orange-500 px-6 py-3 rounded text-white hover:bg-orange-600 transition duration-300 w-full sm:w-auto">
                    Get Started</button>
                <button onClick={() => navigate('/login')} className="border-2 border-orange-300 px-6 py-3 rounded hover:bg-orange-100 transition duration-300 w-full sm:w-auto">Login</button>
            </div>
        </div>
    )
}




