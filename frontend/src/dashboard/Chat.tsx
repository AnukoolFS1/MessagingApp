import FirstChat from "./FirstChatDialoge"

const Chat = () => {

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