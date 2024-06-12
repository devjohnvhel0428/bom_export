const { knex, db } = require('../db')
const util = require('../util')
const Product = require('../models/Product')
const OrderHeader = require('../models/OrderHeader')
const OrderDetail = require('../models/OrderDetail')

exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'Product.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('Product')
    .leftJoin('UserAccount', 'Product.create_user', 'UserAccount.id')
    .leftJoin('OrderHeader', 'Product.id', 'OrderHeader.product_id')
    .select('Product.id', 'Product.image', 'Product.name', 'Product.create_date', 'Product.edit_date', 'OrderHeader.id as order_id', 'Product.n_f', 'UserAccount.name as user_account_name')
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
  ]).then(([count, products]) => {
    let last = Math.ceil(count.count / size)
    res.send({ products, last })
  }).catch(next)
}

exports.getSelected = (req, res, next) => {
  let selectedItems = req.body
  let query = knex('Product')
    .leftJoin('UserAccount', 'Product.create_user', 'UserAccount.id')
    .select('Product.id', 'Product.image', 'Product.name', 'Product.create_date', 'Product.edit_date', 'Product.n_f', 'UserAccount.name as user_account_name')
    .whereIn('Product.id', selectedItems.product)
    .orderBy('Product.id', 'ASC')
    .toString()
  Promise.all([
    db.query(query, { type: 'SELECT' })
  ]).then(([products]) => {
    res.send({ products })
  }).catch(next)
}

exports.getAll = (req, res, next) => {
  let sqlProduct = knex('Product')
    .select('Product.id')
    .toString()
  db.query(sqlProduct, { type: 'SELECT' }).then(products => {
    res.send({ products })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  let sqlBrand = knex('Brand')
    .select('Brand.id', 'Brand.name')
    .toString()
  db.query(sqlBrand, { type: 'SELECT' }).then(brands => {
    res.send({ brands })
  }).catch(next)
}

exports.create = (req, res, next) => {
  let product = util.parseData(Product, { ...req.body })
  Array.from(['image']).forEach(e => {
    if (req.files[e]) {
      product[e] = req.files[e][0].filename
    }
  })
  product.create_user = req.user.id
  product.create_date = Date.now()
  product.edit_date = Date.now()
  Product.create(product)
    .then((newProduct) => {
      let newBom = {
        product_id: '',
        order_date: ''
      }
      newBom.product_id = newProduct.dataValues.id
      newBom.order_date = Date.now()
      OrderHeader.create(newBom).then(() => {
        res.end()
      }).catch(next)
      // res.json(newProduct);
    })
    .catch(next);
}

exports.get = (req, res, next) => {
  let sqlProduct = knex('Product')
    .leftJoin('UserAccount', 'Product.create_user', 'UserAccount.id')
    .select('Product.id', 'Product.name', 'Product.create_date', 'Product.edit_date', 'Product.n_f', 'UserAccount.name as user_account_name', 'Product.image')
    .where('Product.id', req.params.id)
    .toString()
  db.query(sqlProduct, { type: 'SELECT', plain: true }).then(product => {
    res.send({ product })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlProduct = knex('Product')
    .select('Product.id', 'Product.name', 'Product.create_date', 'Product.edit_date', 'Product.n_f', 'Product.image')
    .where('Product.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlProduct, { type: 'SELECT', plain: true })
  ]).then(([product]) => {
    res.send({ product })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let product = util.parseData(Product, { ...req.body })
  product.edit_date = Date.now()
  Array.from(['image']).forEach(e => {
    if (req.files[e]) {
      product[e] = req.files[e][0].filename
    }
  })
  Product.update(product, { where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlProduct = knex('Product')
    .leftJoin('UserAccount', 'Product.create_user', 'UserAccount.id')
    .select('Product.id', 'Product.name', 'Product.create_date', 'Product.edit_date', 'UserAccount.name as user_account_name', 'Product.image', 'Product.n_f')
    .where('Product.id', req.params.id)
    .toString()
  db.query(sqlProduct, { type: 'SELECT', plain: true }).then(product => {
    res.send({ product })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  console.log('mora->', req.params.id)
  OrderHeader.findOne({ where: { product_id: req.params.id } }).then((order) => {
    const order_id = order.id
    console.log('order_id:', order_id)
  
    // Now you can proceed with the deletion
    Product.destroy({ where: { id: req.params.id } }).then(() => {
      OrderHeader.destroy({ where: { product_id: req.params.id } }).then((data) => {
        OrderDetail.destroy({ where: { order_id: order_id } }).then((data) => {
          res.end()
        }).catch(next)
      }).catch(next)
    }).catch(next)
  }).catch(next);
  
}
