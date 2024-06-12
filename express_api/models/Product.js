const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING,
  n_f: Sequelize.STRING,
  create_user: Sequelize.INTEGER,
  create_date: Sequelize.DATE,
  edit_date: Sequelize.DATE,
})