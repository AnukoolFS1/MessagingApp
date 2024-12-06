import './chat.css'

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
type props = {
    active: boolean
}

interface initMsg {
    receiver: string,
    sender: string,
    message: string,
}

const FirstChat = ({ active }: props) => {
    const email = useSelector((state: RootState) => state.users.user.email)
    const [initiateMessage, setInitiateMessage] = useState<initMsg>({ receiver: "", sender: email, message: "Message" })

    const style = {
        display: active ? "flex" : "none",
    }

    const messageHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInitiateMessage((prev):initMsg => {
            return {...prev, message: event.target.value}
        })
    }

    const receiver = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInitiateMessage((prev):initMsg => {
            return {...prev, receiver: event.target.value}
        })
    }
    return (
        <div style={style} className="firstChat">
            <h2>sending by {email}</h2>
            <input type="text" placeholder="Enter Receivers email" onChange={receiver} />
            <textarea rows={5} onChange={messageHandle} placeholder='Message'></textarea>
            <button>send</button>
        </div>
    )
}


export default FirstChat