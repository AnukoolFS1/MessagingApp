

const Conversations = ({conversation, email}:any) => {

    let interlocutors = conversation.map((e:any) =>{
        return (e.users.filter((e:string) => e!==email))[0]
    })
    
    return (
        <div className="interlocutors">
            <ul>
                {interlocutors?.map((c:any) => {
                    return (
                        <li key={c}>{c}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Conversations