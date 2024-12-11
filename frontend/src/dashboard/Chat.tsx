import { AppDispatch, RootState } from "../redux/store"
import FirstChat from "./FirstChatDialoge"
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateMessages } from "../redux/messagesSlice";
import MsgUi from "./Messageui";
import { setMessage, initMsg } from "../redux/initiateMessage";
import axios from 'axios';



const Chat = ({email, FDC}:any) => {
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state:RootState) => state.messages.currentMessages)
    const initiateMessage = useSelector((state:RootState) => state.intMessage)

    const typeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessage(e.target.value))
    }

    const onSubmit = async (initiateMessage:initMsg) => {
        try {
            const response = await axios.post('http://localhost:5000/chatapp', initiateMessage, {
                headers: {
                    "Content-Type": "application/json",
                    // "X-custom-user": "taquila"
                }
            });


            dispatch(setMessage(""))
        }
        catch (err: any) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:5000/messages/${email}`);
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
            <FirstChat active={FDC} onSubmit={onSubmit}/>
            <div className="chat">
                {messages.messages?.map((msg: any) => {
                    return (<MsgUi msg={msg} key={msg.updatedAt} cUser={email}/>)
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