require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const authCtrl = require('./controllers/authController')

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

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))
}).catch((err) => {
    console.log(err)
})