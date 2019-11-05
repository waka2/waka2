const bcrypt = require('bcryptjs')
module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password, email, highscore} = req.body

        // Check to see if the user has already registered.
        const user = await db.find_user(username)

        // If they have, return error message
        if (user[0]) {
            return res.status(200).send('Username already in use!')
        }

        // Salt and hash the password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        // Store the new user in the DB
        const userId = await db.add_user({username, email, highscore})

        // Send back id
        db.add_hash({ user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })

        req.session.user = {username, userId: userId[0].user_id}
        res.status(201).send({message: 'Account Created!', user: req.session.user, loggedIn: true})

    },
    async login(req, res) {
        const db = req.app.get('db')
        const {username: name, password } = req.body

        // Check if user exists (and the hash)
        const user = await db.find_hash(name)
        // IF user doesn't exist, send appropriate response
        if (!user[0]) return res.status(200).send({ message: 'Username not found'})
        // Hash password and compare
        const result = bcrypt.compareSync(password, user[0].hash)

        // If hashes don't match, send appropriate response
        if (!result) return res.status(200).send({ message: 'Incorrect password'})
        // If they do match, add user to sessions
        const {name: username, user_id} = user[0]
        req.session.user = {username, user_id}

        // Send session.user back to front end
        res.status(200).send({ message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged Out', loggedIn: false})
    }
}