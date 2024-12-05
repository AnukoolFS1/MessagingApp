import { Outlet } from "react-router-dom";

const App = () => {
    
    return (
        <section>
            <h1>The ChatApp</h1>
            <hr />
            <Outlet></Outlet>
        </section>
    )
}

export default App