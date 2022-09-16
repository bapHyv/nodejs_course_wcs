const dataSource = require('../utils').dataSource
const Entities = require('../entities/Entities')
const { Wilders, Skills, SkillsToWildersRate } = Entities

module.exports = {
  create: async (req, res) => {
    const { name, description } = req.body
    try {
      await dataSource.getRepository(Wilders).save(req.body)
      res.status(201).send(`The wilder ${req.body.name} has been created`)
    } catch (error) {
      // res.status(500).send(`Error while creating wilder ${req.body.name}`)
    }
  },
  read: async (req, res) => {
    try {
      const data = await dataSource.getRepository(Wilders).find({
        relations: {
          SkillsToWildersRate: {
            Skills: true,
          },
        },
      })
      const formatedData = data.map((e) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          skills: e.SkillsToWildersRate.map((e) => {
            return {
              name: e.Skills.name,
              rate: e.rate,
            }
          }),
        }
      })
      res.send(formatedData)
      return formatedData
    } catch (error) {
      console.log(error)
      res.status(500).send('Error while reading wilders')
    }
  },
  update: async (req, res) => {
    try {
      await dataSource
        .createQueryBuilder()
        .update(Wilders)
        .set({
          name: encodeURI(req.body.name),
        })
        .where('id = :id', { id: req.body.id })
        .execute()
      res.send(
        `The wilder ${req.body.name} with the id ${req.body.id} has been updated`,
      )
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error while updating the wilder ${req.body.name}`)
    }
  },
  delete: async (req, res) => {
    const { id } = req.body
    try {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(Wilders)
        .where('id = :id', { id })
        .execute()
      res.send(`The wilder with the id ${id} has been deleted succesfully`)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error while deleting the wilder with the id ${id}`)
    }
  },
  addSkill: async (req, res) => {
    const { wilderName, skillName } = req.body
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilders)
        .findOneBy({ name: wilderName })

      console.log('addSkill wilderToUpdate', wilderToUpdate)

      const skillToAdd = await dataSource
        .getRepository(Skills)
        .findOneBy({ name: skillName })

      console.log('addSkill skillToAdd', skillToAdd)

      wilderToUpdate.Skills = [...wilderToUpdate.Skills, skillToAdd]
      const result = await dataSource
        .getRepository(Wilders)
        .save(wilderToUpdate)

      console.log('addSkill result', result)
    } catch (error) {
      console.log(error)
    }
  },
  addDescription: async (req, res) => {
    const { name, description } = req.body
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilders)
        .findOneBy({ name })
      wilderToUpdate.description = description
      const result = await dataSource
        .getRepository(Wilders)
        .save(wilderToUpdate)
    } catch (error) {
      console.log(error)
    }
  },
  addRateToSkill: async (req, res) => {
    const { name, skillName, rate } = req.body
    try {
      const wilderToAdd = await dataSource
        .getRepository(Wilders)
        .findOneBy({ name })

      console.log('addRateToSkill wilderToAdd', wilderToAdd)

      const skillToAdd = await dataSource
        .getRepository(Skills)
        .findOneBy({ name: skillName })

      console.log('addRateToSkill skillToAdd', skillToAdd)

      const result = await dataSource.getRepository(SkillsToWildersRate).save({
        rate,
        Skills: skillToAdd,
        Wilders: wilderToAdd,
      })

      console.log('addRateToSkill result', result)
    } catch (error) {
      console.log(error)
    }
  },
}
