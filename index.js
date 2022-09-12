const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log("blabla")
  console.log(res)
  res.send('Hello World!')
})

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params)
  console.log(req.params)
})

app.get('/example/b/:exId', (req, res, next) => {
  console.log("The response will be sent by the next function...")
  next()
}, (req, res) => {
  console.log(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
