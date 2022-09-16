const express = require('express')
const cors = require('cors')
const dataSource = require('./utils').dataSource
const Wider = require('./entities/Wilders')
const controllers = require('./controller/controllers')
const { wildersController, skillsController, ratingController } = controllers

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* CRUD wilder */
app.post('/api/wilder', wildersController.create)
app.get('/api/wilder', wildersController.read)
app.put('/api/wilder', wildersController.update)
app.delete('/api/wilder', wildersController.delete)

/* CRUD skill */
app.post('/api/skill', skillsController.create)
app.get('/api/skill', skillsController.read)
app.put('/api/skill', skillsController.update)
app.delete('/api/skill', skillsController.delete)

/* ADD skill */
app.put('/api/wilder/addSkill', wildersController.addSkill)

/* ADD description */
app.put('/api/wilder/addDescription', wildersController.addDescription)

/* ADD rate to skill */
app.put('/api/wilder/addRateToSkill', wildersController.addRateToSkill)

/* DELETE RATING SKILL */
app.delete('/api/ratingSkill', ratingController.delete)

const start = async () => {
  await dataSource.initialize()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

// app.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

start()
