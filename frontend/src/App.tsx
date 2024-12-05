import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ChatApp from "./ChatApp";
import Login from "./sign(in+up)/Login";
import Signup from "./sign(in+up)/Signup";
import Dashboard from "./dashboard/Dashboard";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/chatapp/login"} />}></Route>

        <Route path="/chatapp" element={<ChatApp />} >
          <Route path="login" element={<Login className="login" />} />
          <Route path="signup" element={<Signup className="signup" />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
