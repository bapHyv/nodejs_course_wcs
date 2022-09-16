const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
  name: 'SkillsToWildersRate',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    rate: {
      type: 'int',
    },
  },
  relations: {
    Skills: {
      target: 'Skills',
      type: 'many-to-one',
      eager: true,
    },
    Wilders: {
      target: 'Wilders',
      type: 'many-to-one',
      eager: true,
      cascade: true,
      onDelete: "CASCADE"
    },
  },
})
