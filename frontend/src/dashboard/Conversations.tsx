

const Conversations = ({conversation}:any) => {

    console.log(conversation)

    return (
        <div>
            <ul>
                {conversation?.map((c:object) => {console.log(c)})}
            </ul>
        </div>
    )
}

export default Conversations