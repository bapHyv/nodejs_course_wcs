const typeorm = require('typeorm')
const Entities = require('./entities/Entities')
const {Wilders, Skills, SkillsToWildersRate} = Entities

module.exports = {
    dataSource: new typeorm.DataSource({
        type: "sqlite",
        database: "./wildersdb.sqlite",
        synchronize: true,
        entities: [Wilders, Skills, SkillsToWildersRate]
    })
}