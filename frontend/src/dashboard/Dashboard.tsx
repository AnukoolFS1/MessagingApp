import axios from "axios";
import Chat from "./Chat";
import Conversations from "./Conversations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionUpdate } from '../redux/userSlice';
import { RootState } from "../redux/store";
import './dashboard.css';
const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.users)
    const [FDC, setFDC] = useState(false)

    function CloseChatDialoge(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setFDC(false)
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const resp = await axios.get('http://localhost:5000/chatapp',
                    { withCredentials: true });
                dispatch(userActionUpdate(resp.data))
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()

        window.addEventListener('keydown', CloseChatDialoge)

        return () => window.removeEventListener("keydown", CloseChatDialoge)
    }, [])


    return (

            <section className="dashboard">
                <Conversations conversations={user.conversations} email={user.user.email} setFDC={setFDC} />
                {
                    user.user.email && <Chat email={user.user.email} FDC={FDC} setFDC={setFDC} />
                }

            </section>
    )
}

export default Dashboard