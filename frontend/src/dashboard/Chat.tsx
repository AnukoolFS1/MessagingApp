import { AppDispatch, RootState } from "../redux/store"
import FirstChat from "./FirstChatDialoge"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCurrentMsg, updateMessages } from "../redux/messagesSlice";
import MsgUi from "./Messageui";
import { setMessage, initMsg } from "../redux/initiateMessage";
// import axios from 'axios';


const Chat = ({ email, FDC, setFDC }: any) => {
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state: RootState) => state.messages.currentMessages)
    const initiateMessage = useSelector((state: RootState) => state.intMessage)
    const [ws, setWs] = useState<WebSocket | null>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const typeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessage(e.target.value))
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/')

        socket.onmessage = (event: MessageEvent) => {
            console.log(event.data)
            dispatch(updateMessages(event.data))
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
    }, [])

    const onSubmit = async (intMsg: initMsg) => {
        try {
            ws?.send(JSON.stringify(intMsg))
            dispatch(setCurrentMsg(intMsg.receiver))
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
            <div className="sendText">
                <input type="text" onChange={typeMessage} value={initiateMessage.message} />
                <button onClick={() => onSubmit(initiateMessage)}>send</button>
            </div>
        </div>
    )
}

export default Chat