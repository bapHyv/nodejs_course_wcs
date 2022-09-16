const dataSource = require('../utils').dataSource
const Skills = require('../entities/Skills')

module.exports = {
  create: async (req, res) => {
    const { name } = req.body
    try {
      await dataSource.getRepository(Skills).save(req.body)
      res.status(201).send(`The skill ${name} has been created`)
    } catch (error) {
      res.status(500).send(`Error while creating wilder ${name}`)
    }
  },
  read: async (req, res) => {
    try {
      const data = await dataSource.getRepository(Skills).find()
      res.send(data)
    } catch (error) {
      res.status(500).send('Error while reading Skills')
    }
  },
  update: async (req, res) => {
    const { id, name } = req.body
    try {
      await dataSource
        .createQueryBuilder()
        .update(Skills)
        .set({
          name: encodeURI(name),
        })
        .where('id = :id', { id: id })
        .execute()
      res.send(`The skill ${name} with the id ${id} has been updated`)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error while updating the skill ${name}`)
    }
  },
  delete: async (req, res) => {
    const { id } = req.body
    try {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(Skills)
        .where('id = :id', { id })
        .execute()
      res.send(`The skill with the id ${id} has been deleted succesfully`)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error while deleting the wilder with the id ${id}`)
    }
  },
}
