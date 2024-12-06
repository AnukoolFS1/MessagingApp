import FirstChat from "./FirstChatDialoge"

const Chat = () => {

    return (
        <div>
            <FirstChat active={true} />
            <div>

            </div>
            <div>
                <input type="text" />
                <button>send</button>
            </div>
        </div>
    )
}

export default Chat