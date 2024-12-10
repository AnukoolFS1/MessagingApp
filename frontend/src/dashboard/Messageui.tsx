import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import './msgui.css';


const MsgUi = ({ msg }: any) => {
    const userId = useSelector((state: RootState) => state.users.user.id)
    let setAlign = msg.sender === userId
    return (
        <div style={{ alignSelf: setAlign ? "end" : "start" }} className="msgui">
            <p>{msg.message}</p>
            <sub>{msg.updatedAt.replace("T", " at ").split(".")[0]}</sub>
            <div>{msg.status}</div>
        </div>
    )
}


export default MsgUi
