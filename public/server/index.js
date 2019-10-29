require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express();

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))
