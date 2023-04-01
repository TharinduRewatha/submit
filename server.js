const express = require("express")
const cors = require("cors")
const mongooseMorgan = require("mongoose-morgan")
const db = require("./models")
const app = express()
app.use(cors())
app.use(express.json())
const mysql = require('mysql2');

const swagggerUI = require("swagger-ui-express")
const YAML = require('yamljs')


app.use(mongooseMorgan({
    connectionString: db.url,
}))

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database Sucessfully!")
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })

require("./routes/submit.route")(app)

app.get("/", (req, res) => {
    res.json("Welcome to Distributed systems SUBMIT server")
})
const PORT = process.env.PORT || 8096
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
    console.log('Access http://localhost:8098/doc/ for swagger docs')
})