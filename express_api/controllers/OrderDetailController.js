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
  Accessory.findOne({ where: { database_reference: orderDetail.database_reference } })
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
        OrderDetail.findOne({ where: { accessory_id: accessory.id, order_id: orderDetail.order_id } })
          .then(existDetail => {
            if (!existDetail.isNewRecord) {
              OrderDetail.create({ ...orderDetail, accessory_id: accessory.id }).then()
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
    .leftJoin('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select(
      'OrderDetail.id',
      'OrderDetail.order_id',
      'OrderDetail.part_number',
      'OrderDetail.designators',
      'Accessory.footprint as footprint',
      'Accessory.manufacturer as manufacturer',
      'Accessory.data as data',
      'Accessory.database_reference as database_reference',
      'Accessory.value as value',
      'OrderDetail.accessory_id',
      'OrderDetail.qty'
    )
    .where('OrderDetail.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlOrderDetail, { type: 'SELECT', plain: true })
  ]).then(([orderDetail]) => {
    res.send({ orderDetail })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let orderDetail = util.parseData(OrderDetail, { ...req.body });
  delete orderDetail.id;

  // Check if the new value already exists in the Accessory table
  Accessory.findOne({ where: { database_reference: orderDetail.database_reference } })
    .then((existingAccessory) => {
      if (existingAccessory && existingAccessory.id !== orderDetail.accessory_id) {
        // Value already exists, send an error message
        return res.status(400).json({ error: 'Database Reference already exists in the Accessory table' });
      }

      // Value doesn't exist, proceed with the update
      Accessory.update(orderDetail, { where: { id: orderDetail.accessory_id } })
        .then(() => {
          OrderDetail.update(orderDetail, { where: { id: req.params.id } })
            .then(() => {
              res.end();
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

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
