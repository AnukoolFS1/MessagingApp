import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import './msgui.css';


const MsgUi = ({ msg }: any) => {
    const userId = useSelector((state: RootState) => state.users.user.id)
    let setAlign = msg.sender === userId
    return (
        <div style={{ alignSelf: setAlign ? "end" : "start" }} className="msgui">
            <p>{msg.message}</p>
            <sub>{msg.updatedAt.split(/[T.]/)[1].slice(0,-3)}</sub>
            <div style={{ display: setAlign ? "block" : "none" }}>{msg.status}</div>
        </div>
    )
}


export default MsgUi