require('dotenv').config()
const express = require('express')
const socket = require('socket.io')
const session = require('express-session')
const massive = require('massive')
const path = require('path');

const authCtrl = require('./controllers/authController')
const scoreCtrl = require('./controllers/scoreController')
const pactCtrl = require('./controllers/pactController')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express();

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))


// Get Score - /api/score
// Put Score - /api/score
// Get HighScores - /api/highscores

app.get('/auth/user', authCtrl.getUser)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

app.get('/api/score', scoreCtrl.singleScore)
app.get('/api/highscores', scoreCtrl.allScores)
app.put('/api/score', scoreCtrl.editScore)

app.get('/api/newplayer', pactCtrl.assignPlayer)
app.put('/api/release', pactCtrl.releasePlayer)

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
        console.log(data)
        // io.to(data.room).emit('room response', data)
        socket.broadcast.emit('room response', data)
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



