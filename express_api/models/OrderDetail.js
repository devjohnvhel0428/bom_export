const Sequelize = require('sequelize')
const { db } = require('../db')

module.exports = db.define('OrderDetail', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: Sequelize.INTEGER,
  },
  part_number: Sequelize.STRING,
  designators: Sequelize.STRING,
  accessory_id: Sequelize.STRING,
  qty: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
})