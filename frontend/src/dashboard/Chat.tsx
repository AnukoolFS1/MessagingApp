import FirstChat from "./FirstChatDialoge"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
const Chat = () => {
    // const messages = useSelector((state:RootState) => state.store.)
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