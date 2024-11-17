import { Outlet } from "react-router-dom"

const App = () => {

    return (
        <section>
            <h1>The Chat App</h1>
            <hr />
            <div>
                <Outlet></Outlet>
            </div>
        </section>
    )
}

export default App