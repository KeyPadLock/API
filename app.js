const express = require("express")

const app = express()
const bodyparser = require("body-parser")
const fs = require("fs") // file system

const port = process.env.KeyPadLockPort || 3000

const cyan = "\x1b[36m"
const red = "\x1b[31m"
const reset = "\x1b[0m"

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

app.post("/auth", (req, res) => {
    const givenKey = req.body.pass
    let isValid = false

    let validKeys = fs.readFileSync("valid.txt", "utf8")
    validKeys = validKeys.split('\n')

    for(i in validKeys) {
        if(validKeys[i] === givenKey) {
            isValid = true
            break
        }
    }

    if(isValid) {
        console.log(cyan, `Received valid key ${givenKey}`, reset)
        res.status(200).json({isValid: true})
    } else {
        console.log(red, `Received invalid key ${givenKey}`, reset)
        res.status(404).json({isValid: false})
    }

})