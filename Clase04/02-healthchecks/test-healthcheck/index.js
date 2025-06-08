const express = require("express")
const cors = require("cors")
const app = express()

function healthCheckApp() {
    return Math.random() > .5 ? true : false
}

function healthCheckDatabase() {
    return Math.random() > .5 ? true : false
}

function healthCheckKafka() {
    return Math.random() > .5 ? true : false
}



app.use(cors())
app.get("/healthcheck", (req, res) => {
    const statusApp = healthCheckApp()
    const statusDatabase = healthCheckDatabase()
    const statusKafka = healthCheckKafka()

    const status = statusApp && statusDatabase && statusKafka ? 200 : 500

    res.status(status).json({
        status_app: statusApp,
        status_database: statusDatabase,
        status_kafka: statusKafka
    })
})

app.listen(3000, () => console.log("Server is running on port 3000"))