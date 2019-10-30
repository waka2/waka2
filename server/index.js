require('dotenv').config()
const express = require('express')
const socket = require('socket.io')
const session = require('express-session')
const massive = require('massive')

const authCtrl = require('./controllers/authController')
const scoreCtrl = require('./controllers/scoreController')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express();

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))


// Get Score - /api/score
// Put Score - /api/score
// Get HighScores - /api/highscores

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

app.get('/api/score', scoreCtrl.singleScore)
app.get('/api/highscores', scoreCtrl.allScores)
app.put('/api/score', scoreCtrl.editScore)

const server = app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))

// Sockets for Ghost Pact Update
const io = socket(server)

io.on('connection', socket => {
    console.log('socket connected')

    // Join Room
    socket.on('join room', data => {
        socket.join(data.room)
    })

    // Blast to room
    socket.on('blast to room socket', data => {
        console.log(`blast to room ${data.room}`)
        io.to(data.room).emit('room response', data)
    })

    // Emit to room
    socket.on('emit to room socket', data => {
        console.log(`emit to room ${data.room}`)
        socket.emit('room response', data)
    })
})

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch((err) => {
    console.log(err)
})



