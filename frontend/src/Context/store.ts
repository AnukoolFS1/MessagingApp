import { createContext, Dispatch, SetStateAction } from "react";

interface socket {
    socket: WebSocket | null,
    setWsState: Dispatch<SetStateAction<number>>
}

const store = createContext<socket>({
    socket: null,
    setWsState: () => 0
})


export default store