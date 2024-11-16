import Chats from "./Chat";
import Conversations from "./Conversations";

export default function Dashboard() {

    
    return (
        <section className="dashboard">
            <Conversations />
            <Chats />
        </section>
    )
}