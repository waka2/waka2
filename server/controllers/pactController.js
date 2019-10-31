module.exports = {
    async assignPlayer (req, res) {
        const db = req.app.get('db')
        const player_id = await db.assign_player();

        if (player_id) {
            const reserve = await db.reserve_player(player_id[0].player_id)
            res.status(200).send({ player: player_id[0]})
        } else {
            res.status(302).send({ message: "Server is full, please wait for the next availible slot."})
        }
    },
    async releasePlayer (req, res) {
        const db = req.app.get('db')
        const { id } = req.body
       await db.release_player(id)

        res.sendStatus(200)

    }
}