import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50">
            <div className="p-8 max-w-md  rounded-lg shadow w-full bg-white">
                <h2 className="mb-6 text-center font-bold text-3xl text-gray-800 ">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin}>
                    <div className="mt-4 flex items-center border-b pb-2 border-gray-300 ">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <input className="ml-3 w-full outline-none"type="email" placeholder="Enter your Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-5 flex items-center border-b pb-2 border-gray-300 ">
                        <Lock className="w-5 h-5 text-gray-500" />
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="ml-3 w-full outline-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full mt-6 hover:bg-orange-600 bg-orange-500 text-white font-semibold py-2 rounded 
                        transition-colors duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don't have a account?{' '}
                    <button 
                        onClick={() => navigate('/Signup')}
                        className="text-blue-400 hover:underline"
                    >
                        Signup
                    </button>
                </p>
            </div>
        </div>
    )
}