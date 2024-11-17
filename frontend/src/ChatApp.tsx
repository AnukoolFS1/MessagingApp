// import { Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
// import Signup from "./sign(in+up)/Signup"
// import Dashboard from "./dashboard/Dashboard"
// import Login from "./sign(in+up)/Login"

const App = () => {

    return (
        <section>
            <h1>Username</h1>
            <hr />
            <div>
                <Outlet></Outlet>
            </div>
            {/* <Dashboard /> */}
            {/* <Login className="login" /> */}
            {/* <Signup className="signup" /> */}
        </section>
    )
}

export default App