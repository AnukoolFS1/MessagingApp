// import axios from "axios";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const App = () => {

    // console.log('234')
    // useEffect(() => {
    //     async function getData() {

    //         try {
    //             const resp = await axios.get('http://localhost:5000/chatapp');
    //             console.log(resp)
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     }

    //     getData()

    // }, [])
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