const { Router } = require("express")
const request = require("request")
const router = Router()

router.get('/events', (req, res) => {
    const url =
        "https://escal-api.prod.app.esports.one/events?needs_review=false&%24sort%5Bstart_datetime%5D=1&start_datetime%5B%24gte%5D=2020-01-19T00%3A00%3A00.000Z&%24limit=100"
    request(
        {
            method: "GET",
            uri: url
        },
        function(error, response, body) {
            console.log(error)
            if (!error) {
                res.setHeader("Access-Control-Allow-Origin", "*")
                res.setHeader(
                    "Access-Control-Allow-Headers",
                    "origin, content-type, accept"
                )
                return res.json({
                    events: JSON.parse(body)
                })
            } else {
                console.log("error: " + response.statusCode)
                return res.status(400).json({
                    message: 'Events not found'
                })
            }
        }
    )
})

module.exports = router
