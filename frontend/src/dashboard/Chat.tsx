// import { AppDispatch } from "../redux/store"
import FirstChat from "./FirstChatDialoge"
// import { useSelector,useDispatch } from "react-redux"
// import { RootState } from "../redux/store";
// import { fetchMessages } from "../redux/messagesSlice"
import { useEffect } from "react"
const Chat = ({email}:any) => {
    // const messages = useSelector((state:RootState) => state.store)
    // const dispatch = useDispatch<AppDispatch>()
    // dispatch(fetchMessages(email))

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:5000/messages/${email}`);
        eventSource.onmessage = (event) => {

            console.log(event.data)
        }

        eventSource.onerror = (error) => {

            console.log(error)
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <div className="Chats">
            <FirstChat active={false} />
            <div className="chat">

            </div>
            <div className="sendText">
                <input type="text" />
                <button>send</button>
            </div>
        </div>
    )
}

export default Chat