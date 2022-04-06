import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
const fs = require('fs')
const express = require('express')
const Router = require('express-promise-router')
const { Server } = require('socket-io')
const io = new Server(server)


//Create router
const router = Router()

//Main route serves the index HTML
router.get('/', async (req, res, next) => {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.send(html)
})

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({message: 'Not Found' })
})

// Create express app and listen on port 4040
const app = express()
app.use(express.static('dist'))
app.use(router)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:3000...`)  
})

let clients = {}

// Socket app msgs
io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected...`)
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
