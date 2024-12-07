import './chat.css';
import axios from 'axios';

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
        setInitiateMessage((prev): initMsg => {
            return { ...prev, message: event.target.value }
        })
    }

    const receiver = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInitiateMessage((prev): initMsg => {
            return { ...prev, receiver: event.target.value }
        })
    }

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {

            const response = await axios.post('http://localhost:5000/chatapp', initiateMessage, {
                headers:{
                    "Content-Type": "application/json",
                    // "X-custom-user": "taquila"
                }
            });

            console.log(response.data)
        }
        catch(err:any) {
            console.log(err.response)
        }
        }
    return (
        <div style={style} className="firstChat">
            <h2>sending by {email}</h2>
            <input type="text" placeholder="Enter Receivers email" onChange={receiver} />
            <textarea rows={5} onChange={messageHandle} placeholder='Message'></textarea>
            <button onClick={onSubmit}>send</button>
        </div>
    )
}


export default FirstChat