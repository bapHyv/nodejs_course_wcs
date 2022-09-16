const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
  name: 'Wilders',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'text',
    },
    description: {
      type: 'text',
      nullable: true,
    },
  },
  relations: {
    Skills: {
      target: 'Skills',
      type: 'many-to-many',
      joinTable: true,
      eager: true,
    },
    SkillsToWildersRate: {
      target: 'SkillsToWildersRate',
      type: 'one-to-many',
      joinTable: true,
      inverseSide: 'Wilders',
    },
  },
})
