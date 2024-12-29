import { AppDispatch, RootState } from "../redux/store"
import FirstChat from "./FirstChatDialoge";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef} from "react";
import { setCurrentMsg } from "../redux/messagesSlice";
import MsgUi from "./Messageui";
import { setMessage, initMsg } from "../redux/initiateMessage";
import Context from "../Context/Context";
// import axios from 'axios';


const Chat = ({ email, FDC, setFDC }: any) => {
    const {setWsState, socket} = Context()
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state: RootState) => state.messages.currentMessages)
    const allmessages = useSelector((state: RootState) => state.messages.messages)
    const initiateMessage = useSelector((state: RootState) => state.intMessage)
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const typeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessage(e.target.value))
    }

    const focusInput = () => { //e: React.FocusEvent<HTMLInputElement>
        if (socket?.readyState === 3) setWsState(Math.random())
    }

    function setMessages() {
        dispatch(setCurrentMsg(initiateMessage.receiver))
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    useEffect(() =>{
        setMessages()
    }, [allmessages])

    const onSubmit = async (intMsg: initMsg) => {
        try {
            socket?.send(JSON.stringify(intMsg))
            setFDC(false)
            dispatch(setMessage(""))
        }
        catch (err: any) {
            console.log(err.response)
        }
    }

    return (
        <div className="Chats">
            <FirstChat active={FDC} onSubmit={onSubmit} />
            <div className="chat" ref={chatContainerRef}>
                {messages.messages?.map((msg: any) => {
                    return (<MsgUi msg={msg} key={msg.updatedAt} cUser={email} />)
                })}
            </div>
            <div className="sendText" style={{ display: initiateMessage.receiver ? "flex" : "none" }}>
                <input type="text" onChange={typeMessage} onFocus={focusInput} value={initiateMessage.message} />
                <button onClick={() => onSubmit(initiateMessage)}>send</button>
            </div>
        </div>
    )
}

export default Chat