import { useDispatch } from "react-redux"
import { fetchMessages } from "../redux/messagesSlice"
import { AppDispatch } from "../redux/store"

const Conversations = ({conversation, email}:any) => {
    const dispatch = useDispatch<AppDispatch>()

    let interlocutors = conversation.map((e:any) =>{
        return (e.users.filter((e:string) => e!==email))[0]
    })

    const retrieveMessges = (email:string) => {
        dispatch(fetchMessages(email))
    }
    
    return (
        <div className="interlocutors">
            <ul>
                {interlocutors?.map((c:any) => {
                    return (
                        <li key={c} onClick={() =>{ retrieveMessges(c)}}>{c}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Conversations