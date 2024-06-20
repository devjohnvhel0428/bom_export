const { knex, db } = require('../db')
const util = require('../util')
const Accessory = require('../models/Accessory')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'Accessory.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('Accessory')
    .leftJoin('UserAccount', 'Accessory.create_user', 'UserAccount.id')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.create_date', 'Accessory.data', 'Accessory.manufacturer', 'Accessory.info', 'UserAccount.name as user_account_name')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
    if (operator == 'like') {
      search = `%${search}%`
    }
    query.where(column, operator, search)
  }
  let sqlCount = query.clone().clearSelect().clearOrder().count('* as "count"').toString()
  let sqlQuery = query.offset((page - 1) * size).limit(size).toString()
  Promise.all([
    db.query(sqlCount, { type: 'SELECT', plain: true }),
    db.query(sqlQuery, { type: 'SELECT' })
  ]).then(([count, accessories]) => {
    let last = Math.ceil(count.count / size)
    res.send({ accessories, last })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  res.end()
}

exports.create = (req, res, next) => {
  let accessory = util.parseData(Accessory, { ...req.body });
  accessory.create_user = req.user.id;
  accessory.create_date = Date.now();

  // Check if an accessory with the same field values already exists
  Accessory.findOne({ where: { value: accessory.value }})
    .then(existingAccessory => {
      if (existingAccessory) {
        // If an accessory with the same field values exists, return an error
        res.status(400).send('An accessory with the same field values already exists.');
      } else {
        // If no such accessory exists, create a new one
        Accessory.create(accessory)
          .then(() => {
            res.end();
          })
          .catch(next);
      }
    })
    .catch(next);
};


exports.get = (req, res, next) => {
  let sqlAccessory = knex('Accessory')
    .leftJoin('UserAccount', 'Accessory.create_user', 'UserAccount.id')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.data', 'Accessory.info', 'Accessory.manufacturer', 'Accessory.create_date', 'UserAccount.name as user_account_name')
    .where('Accessory.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlAccessory, { type: 'SELECT', plain: true })
  ]).then(([accessory]) => {
    res.send({ accessory })
  }).catch(next)
}

exports.getSimilar = (req, res, next) => {
  let sqlAccessory = knex('Accessory')
    .leftJoin('UserAccount', 'Accessory.create_user', 'UserAccount.id')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.data', 'Accessory.info', 'Accessory.manufacturer', 'Accessory.create_date', 'UserAccount.name as user_account_name')
    .where('Accessory.footprint', req.params.name)
    .where('Accessory.value', req.params.value)
    .toString()
  db.query(sqlAccessory, { type: 'SELECT' }).then(accessories => {
    res.send({ accessories })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlAccessory = knex('Accessory')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.data', 'Accessory.manufacturer', 'Accessory.info')
    .where('Accessory.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlAccessory, { type: 'SELECT', plain: true }),
  ]).then(([accessory]) => {
    res.send({ accessory })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let accessory = util.parseData(Accessory, { ...req.body })
  Accessory.update(accessory, { where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlAccessory = knex('Accessory')
    .leftJoin('UserAccount', 'Accessory.create_user', 'UserAccount.id')
    .select('Accessory.id', 'Accessory.footprint', 'Accessory.value', 'Accessory.data', 'Accessory.info', 'Accessory.manufacturer', 'Accessory.create_date', 'UserAccount.name as user_account_name')
    .where('Accessory.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlAccessory, { type: 'SELECT', plain: true })
  ]).then(([accessory]) => {
    res.send({ accessory })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  Accessory.destroy({ where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}
