import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setCurrentMsg } from "../redux/messagesSlice";
import { setReceiver } from "../redux/initiateMessage";

const Conversations = ({conversations, email,setFDC}:any) => {
    const dispatch = useDispatch<AppDispatch>();
    
    let interlocutors = conversations.map((e:any) =>{
        return (e.users.filter((e:string) => e!==email))[0]
    })
    
    const setMessages = (email: string) => {
        dispatch(setCurrentMsg(email))
        dispatch(setReceiver(email))
    }

    return (
        <div className="interlocutors">
            <ul>
                <li onClick={()=> {setFDC((prev:boolean):boolean => !prev)}}>New Conversation</li>
                {interlocutors?.map((c:any) => {
                    return (
                        <li key={c} onClick={() => setMessages(c)}>{c}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Conversations