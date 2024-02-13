const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('to-do-list', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Connected to Sequelize!')
} catch (error) {
    console.error(error)
}

module.exports = sequelize