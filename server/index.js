const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    res.send('hello world')
})

app.listen(1337, () => {
    console.log("server is running on port 1337")
})