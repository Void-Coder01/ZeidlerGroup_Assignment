import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader } from 'lucide-react';
import { userContext } from "../store/user.context";

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {signup, isLoading, error,setError } = useContext(userContext)

    const handleSignup = async(e) => {
        e.preventDefault();

         if(email === '' || password === '' || name === ''){
            setError("All Input should be filled")
            return;
        }

        try {
            
            const res = await signup(name, email, password);

            if(res.success){
                setError(null);
                navigate('/login');
            }else{
                console.log("error in handlesignup")
            }
        
        } catch (error) {
            console.log("error in handlesignup" ,error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="max-w-md p-8 rounded-lg shadow w-full bg-white">
                <h2 className=" mb-6 text-gray-800 text-center font-bold text-3xl ">
                    Create Account
                </h2>

                <form onSubmit={handleSignup}>
                    <div className="mt-4 flex items-center pb-2  border-b border-gray-300 ">
                        <User className="w-5 h-5 text-gray-500" />
                        <input  className="ml-3 w-full outline-none" type="text" placeholder="Enter your name" value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex items-center pb-2  border-b border-gray-300 ">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <input className="ml-3 w-full outline-none"type="email" placeholder="Enter your Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex items-center pb-2  border-b border-gray-300 ">
                        <Lock className="w-5 h-5 text-gray-500" />
                        <input type="password" placeholder="Enter your password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="ml-3 w-full outline-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className=" mt-6 w-full hover:bg-orange-600 bg-orange-500 text-white font-semibold py-2 rounded  cursor-pointer
                        transition-all duration-200     "
                    >
                        {isLoading ? <Loader className="m-auto animate-spin"/> : "Signup"}
                    </button>
                </form>

                {error && (
                    <div className=" text-red-700 ">
                        {error}
                    </div>
                )}

                <p className="mt-6 text-gray-400 text-center ">
                    Already have an account?{' '}
                    <button 
                        onClick={() => {
                            setError(null);
                            navigate('/login')}}
                        className="text-blue-400 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
}