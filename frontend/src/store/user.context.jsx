import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const userContext = createContext();

const URL = "http://localhost:5000/user"

export const UserContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const checkAuth = async() => {
            const response = await axios.get(`${URL}/verify`,{withCredentials : true});

            if(response.data.success){
                setIsAuthenticated(true);
                console.log("user is authenticated")
            }else{
                setIsAuthenticated(false);
                console.log("user is not authenticated")
            }
        }
        setIsLoading(false);

        checkAuth();
    },[])

    const signup = async(name, email, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${URL}/signup`, {
                name,
                email,
                password
            },{ withCredentials: true })

            setIsLoading(false);

            return { success: true, data: response.data }

        } catch (error) {
            console.log("error in signup function ", error)
            
            setIsLoading(false);
            
            setError(error.response?.data?.msg);
            return{
                success : false,
                error : error.response?.data?.msg
            }
        }
    }

    const login = async(email, password) => {
        setIsLoading(true);
        setError(null);
        try {
        
            const response = await axios.post(`${URL}/login`, {
                email : email,
                password : password
                
            },{withCredentials : true})


            setIsAuthenticated(true);
            setIsLoading(false);
            
            return { success: true, data: response.data }

        } catch (error) {
            console.log("error in sending login req to BE", error);
            
            setIsAuthenticated(false);
            setIsLoading(false);
            setError(error.response?.data?.msg);
            
            return {
                success : false,
                error : error.response?.data?.msg
            }
        }
    }

    const logout = async() => {
        const response = await axios.get(`${URL}/logout`,{
            withCredentials : true
        });
        setIsAuthenticated(false);
    }

    const getTodo = async() => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${URL}/my-todo`, {
                withCredentials : true
            });
            setIsLoading(false);
            return {success : true, todo : res.data.todos};
            
        } catch (error) {
            setIsLoading(false)
            console.log("error in getTodo", error);
            setError(error.response?.data?.msg)
        }
    }
    
    return (
        <userContext.Provider  value={
            {
                login : login,
                isAuthenticated : isAuthenticated,
                isLoading : isLoading,
                setIsLoading : setIsLoading,
                signup : signup,
                error : error,
                setError,
                getTodo,
                logout
            }}>
            {children}
        </userContext.Provider>
    )
}



