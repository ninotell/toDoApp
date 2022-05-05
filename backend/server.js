const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const routes = require("./routes/routes")
const db = require("./services/dbconnector")

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.authenticate()
    .then(console.log("Connection established"))
    .catch(e => console.log(e))

db.sync()
    .then(console.log("Sync correct"))
    .catch(e => console.log(e))

routes.assignRoutes(app)


app.listen(3001, () => {
    console.log("Running on port 3001")
})