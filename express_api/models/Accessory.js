const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Accessory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  footprint: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: Sequelize.STRING,
  value: Sequelize.STRING,
  manufacturer: Sequelize.STRING,
  info: Sequelize.STRING,
  create_user: Sequelize.INTEGER,
  create_date: Sequelize.DATE
})