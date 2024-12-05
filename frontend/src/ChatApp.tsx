import { useSelector } from "react-redux";
import { IS } from "./redux/userSlice";
import { Outlet } from "react-router-dom";

const App = () => {
    const username = useSelector((state:IS) => state.user.name)
    
    return (
        <section>
            <h1>{username || "The ChatApp"}</h1>
            <hr />
            <Outlet></Outlet>
        </section>
    )
}

export default App