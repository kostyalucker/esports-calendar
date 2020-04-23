const express = require("express");
const config = require("config")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port = config.get("port") || 5000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api", require("./routes/events.routes"))

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log("error", e)
        process.exit(1)
    }
}

start()

app.listen(port, () => {
    console.log(`App started on ${port}`)
})
