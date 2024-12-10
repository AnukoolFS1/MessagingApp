import axios from "axios";
import Chat from "./Chat";
import Conversations from "./Conversations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionUpdate } from '../redux/userSlice';
import { RootState } from "../redux/store";
import './dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.users)


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
    }, [])

    return (
        <section className="dashboard">
            <Conversations conversation={user.conversations} email={user.user.email} />
            {
                user.user.email && <Chat email={user.user.email} />
            }

        </section>
    )
}

export default Dashboard