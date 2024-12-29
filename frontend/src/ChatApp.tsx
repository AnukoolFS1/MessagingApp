import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "./redux/store";
import axios from "axios";
import Context from "./Context/Context";
import { useNavigate } from "react-router-dom";
import { initialState, userActionUpdate } from "./redux/userSlice";

const App = () => {
    const username = useSelector((state:RootState) => state.users.user.name)
    const {socket} = Context();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout(){
        axios.get("http://localhost:5000/logout", {withCredentials:true})
        console.log(socket)
        socket?.close()
        dispatch(userActionUpdate(initialState))
        navigate("/")
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