import { useEffect,useState } from "react"
import { updateMessages } from "../redux/messagesSlice"
import { AppDispatch, RootState } from "../redux/store"
import store from "./store"
import { useDispatch,useSelector } from "react-redux"

const Provider = ({ children }:any) => {
    const [ws, setWs] = useState<WebSocket | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state:RootState) => state.users.user)
    const [wsState, setWsState] = useState<number>(0)
    
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/')

        socket.onopen = () => {
            socket.send(JSON.stringify({event:"first_connect", payload: user}))
        }

        socket.onmessage = (event: MessageEvent) => {
            const response = JSON.parse(event.data)
            if (response.errMsg) { 
                alert(response.errMsg) }
            else {
                dispatch(updateMessages(response))
            }
        }

        socket.onerror = (error) => {
            console.error(error)
        }

        socket.onclose = () => {
            console.log(`ws server has closed`)
        }

        setWs(socket)
        console.log('socket connected')
        return () => {
            socket.close()
        }
    }, [wsState, user])

    return (<store.Provider value={{socket:ws, setWsState}}>
        {children}
    </store.Provider>)
}

export default Provider