import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "./redux/store";

const App = () => {
    const username = useSelector((state:RootState) => state.users.user.name)
    
    return (
        <section>
            <h1 className="heading">{username || "The ChatApp"}</h1>
            <hr />
            <Outlet></Outlet>
        </section>
    )
}

export default App