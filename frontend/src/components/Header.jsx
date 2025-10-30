import { LogOut } from "lucide-react"
import { useContext } from "react"
import { userContext } from "../store/user.context"


export const Header = () => {
    const { logout } = useContext(userContext);
    return (
        <div className="bg-white flex justify-between max-w-6xl items-center px-6 py-4 mx-auto">
            <div>
                <p className="font-bold text-2xl text-orange-800">TODOWALLAH</p>
            </div>
            <div >
                <LogOut className="hover:text-red-500 text-red-800 cursor-pointer ml-2" onClick={logout} />
                <span className="text-sm text-red-800 ">logout</span>
            </div>
        </div>
    )
}