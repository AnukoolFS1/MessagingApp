import FirstChat from "./FirstChatDialoge"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect } from "react"
const Chat = () => {
    // const messages = useSelector((state:RootState) => state.store)

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/chatappmessages');

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