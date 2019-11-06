module.exports = {
    async singleScore (req, res) {
        const db = req.app.get('db')
        const { id } = req.query
        const score = await db.get_score(id)

        // If the score is found, send it back to front. Otherwise,
        // Let them know they haven't made a score yet.
        if (score[0]) {
            res.status(200).send({highscore: score[0].highscore})
        } else {
            res.status(302).send({message: 'You haven\'t made a score yet!'})
        }
    },
    async allScores (req, res) {
        const db = req.app.get('db')
        const scores = await db.get_highscores()

        if (scores) {
            res.status(200).send(scores)
        } else {
            res.status(302).send({message: 'No Scores Found'})
        }

    },
    async editScore (req, res) {
        const db = req.app.get('db')
        const {id, score } = req.body;
        const updatedScore = await db.update_score(id, score);

        if (updatedScore) {
            res.status(200).send({username: updatedScore[0].username, highscore: updatedScore[0].highscore, message: `${updatedScore[0].username}'s new highscore is ${updatedScore[0].highscore}!`})
        } else {
            res.status(302).send({message: 'User not found.'})
        }
    }
}