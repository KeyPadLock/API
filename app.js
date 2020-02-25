const express = require("express")

const app = express()
const bodyparser = require("body-parser")
const fs = require("fs") // file system

// port for API to listen on
const port = process.env.KeyPadLockPort || 3000

// console colors
const cyan = "\x1b[36m"
const red = "\x1b[31m"
const reset = "\x1b[0m"

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

// handling incoming post request
app.post("/auth", (req, res) => {
    // get the provided password
    const givenKey = req.body.pass
    let isValid = false

    // read in the valid values from valid.txt file
    let validKeys = fs.readFileSync("valid.txt", "utf8")
    validKeys = validKeys.split('\n')

    // loop through valid values and compare them to the given key
    for(i in validKeys) {
        if(validKeys[i] === givenKey) {
            // valid key identified
            isValid = true
            break
        }
    }

    // return proper response
    if(isValid) {
        console.log(cyan, `Received valid key ${givenKey}`, reset)
        res.status(200).json({isValid: true})
    } else {
        console.log(red, `Received invalid key ${givenKey}`, reset)
        res.status(404).json({isValid: false})
    }

})