import axios from "axios";
import Chat from "./Chat";
import Conversations from "./Conversations";
import { useEffect, useState } from "react";

interface User {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    isOnline: boolean
}

const Dashboard = () => {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        isOnline: false
    })

    useEffect(() => {
        async function getData() {

            try {

                const resp = await axios.get('http://localhost:5000/chatapp',
                    { withCredentials: true });

                setUser(resp.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        getData()

    }, [])

    return (
        <section>
            <Conversations />
            <Chat />
        </section>
    )
}

export default Dashboard