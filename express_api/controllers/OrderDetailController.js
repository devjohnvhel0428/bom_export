const { knex, db } = require('../db')
const util = require('../util')
const OrderHeader = require('../models/OrderHeader')
const OrderDetail = require('../models/OrderDetail')
const Accessory = require('../models/Accessory')

exports.getCreate = (req, res, next) => {
  let sqlAccessory = knex('Accessory')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.manufacturer')
    .toString()
  db.query(sqlAccessory, { type: 'SELECT' }).then(accessories => {
    res.send({ accessories })
  }).catch(next)
}

exports.create = (req, res, next) => {
  let orderDetail = util.parseData(OrderDetail, { ...req.body })
  Accessory.findOne({ where: { footprint: orderDetail.footprint, value: orderDetail.value } })
    .then(accessory => {
      if (!accessory) {
        orderDetail.create_user = req.user.id
        orderDetail.create_date = Date.now()
        Accessory.create(orderDetail)
          .then(newAccessory => {
            OrderDetail.create({ ...orderDetail, accessory_id: newAccessory.id }).then()
          });
      } else {
        orderDetail.create_user = req.user.id
        orderDetail.create_date = Date.now()
        if (accessory.manufacturer != orderDetail.manufacturer) {
          Accessory.create(orderDetail).then()
        }
        OrderDetail.findOne({ where: { accessory_id: accessory.id, order_id: orderDetail.order_id } })
          .then(existDetail => {
            if (!existDetail.isNewRecord) {
              OrderDetail.create({ ...orderDetail, accessory_id: accessory.dataValues.id }).then()
            }
          })
      }
    })
    .then(() => {
      res.end()
    })
    .catch(next)
}


exports.edit = (req, res, next) => {
  let sqlOrderDetail = knex('OrderDetail')
    .select('OrderDetail.id', 'OrderDetail.order_id', 'OrderDetail.part_number', 'OrderDetail.designators', 'OrderDetail.accessory_id', 'OrderDetail.qty')
    .where('OrderDetail.id', req.params.id)
    .toString()
  let sqlAccessory = knex('Accessory')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.data', 'Accessory.manufacturer', 'Accessory.info')
    .toString()
  Promise.all([
    db.query(sqlOrderDetail, { type: 'SELECT', plain: true }),
    db.query(sqlAccessory, { type: 'SELECT' })
  ]).then(([orderDetail, accessories]) => {
    console.log('ommra->', orderDetail)
    res.send({ orderDetail, accessories })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let orderDetail = util.parseData(OrderDetail, { ...req.body })
  console.log('marg->', orderDetail)
  OrderDetail.update(orderDetail, { where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlOrderDetail = knex('OrderDetail')
    .leftJoin('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select('OrderDetail.id', 'OrderDetail.order_id', 'OrderDetail.part_number', 'OrderDetail.designators', 'Accessory.footprint as footprint', 'OrderDetail.accessory_id', 'OrderDetail.qty')
    .where('OrderDetail.id', req.params.id)
    .toString()
  db.query(sqlOrderDetail, { type: 'SELECT', plain: true }).then(orderDetail => {
    res.send({ orderDetail })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  OrderDetail.destroy({ where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}
