import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "./redux/store";
import axios from "axios";

const App = () => {
    const username = useSelector((state:RootState) => state.users.user.name)

    function logout(){
        axios.get("http://localhost:5000/logout", {withCredentials:true})
    }
    return (
        <section>
            <h1 className="heading">{username || "The ChatApp"} {username&& <button className="logout" onClick={logout}>Logout</button>}</h1>
            <hr />
            <Outlet></Outlet>
        </section>
    )
}

export default App