import './chat.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSender, setMessage, setReceiver, initMsg } from '../redux/initiateMessage';
type props = {
    active: boolean,
    onSubmit: (initiateMessage:initMsg) => {}
}

const FirstChat = ({ active, onSubmit }: props) => {
    const email = useSelector((state: RootState) => state.users.user.email);
    const initiateMessage = useSelector((state:RootState) => state.intMessage) 
    const dispatch = useDispatch()
    const style = {
        display: active ? "flex" : "none",
    }

    const messageHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setMessage(event.target.value))
    }

    const receiver = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setReceiver(event.target.value))
    }

    

    useEffect(() => {
        if (email) {
            dispatch(setSender(email))
        }
    }, [email]);
    return (
        <div style={style} className="firstChat">
            <h2>sending by {email}</h2>
            <input type="text" placeholder="Enter Receivers email" onChange={receiver} />
            <textarea rows={5} onChange={messageHandle} placeholder='Message'></textarea>
            <button onClick={()=>onSubmit(initiateMessage)}>send</button>
        </div>
    )
}


export default FirstChat