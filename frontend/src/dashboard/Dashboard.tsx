import axios from "axios";
import Chat from "./Chat";
import Conversations from "./Conversations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionUpdate } from '../redux/userSlice';
import { RootState } from "../redux/store";

const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.users)
    // const [user, setUser] = useState<User>({
    //     id: "",
    //     name: "",
    //     email: "",
    //     phone: "",
    //     role: "",
    //     isOnline: false
    // })

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
        <section>
            <Conversations conversation={user.conversations} />
            <Chat />
        </section>
    )
}

export default Dashboard