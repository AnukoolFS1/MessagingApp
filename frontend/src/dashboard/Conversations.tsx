// import { useState } from "react"


const Conversations = ({conversation, email}:any) => {
    // const [users, setUsers] = useState<string[]>([])

    let users = conversation.map((e:any) =>{
        return (e.users.filter((e:string) => e!==email))[0]
    })
    
    return (
        <div>
            <ul>
                {users?.map((c:any) => {
                    return (
                        <li key={c}>{c}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Conversations