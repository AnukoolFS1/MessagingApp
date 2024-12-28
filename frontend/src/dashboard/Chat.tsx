import { AppDispatch, RootState } from "../redux/store"
import FirstChat from "./FirstChatDialoge";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCurrentMsg, updateMessages } from "../redux/messagesSlice";
import MsgUi from "./Messageui";
import { setMessage, initMsg } from "../redux/initiateMessage";
// import axios from 'axios';


const Chat = ({ email, FDC, setFDC }: any) => {
    const [wsState, setWsState] = useState<number>(0)
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state: RootState) => state.messages.currentMessages)
    const allmessages = useSelector((state: RootState) => state.messages.messages)
    const initiateMessage = useSelector((state: RootState) => state.intMessage)
    const user = useSelector((state:RootState) => state.users.user)
    const [ws, setWs] = useState<WebSocket | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const typeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessage(e.target.value))
    }

    const focusInput = () => { //e: React.FocusEvent<HTMLInputElement>
        if (ws?.readyState === 3) setWsState(Math.random())
    }

    function setMessages() {
        dispatch(setCurrentMsg(initiateMessage.receiver))
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/')

        socket.onopen = () => {
            socket.send(JSON.stringify({event:"first_connect", payload: user}))
        }

        socket.onmessage = (event: MessageEvent) => {
            const response = JSON.parse(event.data)
            if (response.errMsg) { 
                alert(response.errMsg) }
            else {
                dispatch(updateMessages(response))
            }
        }

        socket.onerror = (error) => {
            console.error(error)
        }

        socket.onclose = () => {
            console.log(`ws server has closed`)
        }

        setWs(socket)
        return () => {
            socket.close()
        }
    }, [wsState])
    useEffect(() =>{
        setMessages()
    }, [allmessages])

    const onSubmit = async (intMsg: initMsg) => {
        try {
            ws?.send(JSON.stringify(intMsg))
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