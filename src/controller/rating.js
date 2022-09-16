const dataSource = require('../utils').dataSource
const SkillsToWildersRate = require('../entities/SkillsToWildersRate')

module.exports = {
  delete: async (req, res) => {
    const { id } = req.body
    try {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(SkillsToWildersRate)
        .where('id = :id', { id })
        .execute()
      res.send(`The SkillsToWildersRate with the id ${id} has been deleted succesfully`)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Error while deleting the wilder with the id ${id}`)
    }
  },
}
