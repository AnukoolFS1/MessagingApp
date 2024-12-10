import { AppDispatch, RootState } from "../redux/store"
import FirstChat from "./FirstChatDialoge"
import { useSelector,useDispatch } from "react-redux"
// import { fetchMessages } from "../redux/messagesSlice"
import { useState,useEffect } from "react";
import { updateMessages } from "../redux/messagesSlice";
const Chat = ({email}:any) => {
    const messages = useSelector((state:RootState) => state.messages)
    const dispatch = useDispatch<AppDispatch>()
    const [showConversation, setShowConversation] = useState([])
    // dispatch()

    useEffect(() => {
        console.log(email)
        const eventSource = new EventSource(`http://localhost:5000/messages/${email}`);
        console.log(eventSource)
        eventSource.onmessage = (event) => {
            dispatch(updateMessages(JSON.parse(event.data)))
        }
        eventSource.onerror = (error) => {
            console.log(error)
        }

        return () => {
            eventSource.close()
        }
    }, [email])

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