import { io } from 'socket.io-client'
import React, { useState, useEffect, useRef } from 'react'



export default function App() {

    const [socketClient, setSocketClient] = useState(null)

    useEffect(() => {
        // On mount initialize the socket connection
        setSocketClient(io.connect("http://localhost:3000"))
        console.log("Connected")
    
        // Dispose gracefully
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socketClient) {
            socketClient.on('connect', () => {
                console.log(`message from client: connected with id ${socketClient.id}`)
            })
        }
    })
    
    return (
        <h1 className="title"> Hello there! </h1>
    )
}