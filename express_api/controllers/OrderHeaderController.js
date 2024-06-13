require('dotenv').config();
const { knex, db } = require('../db')
const util = require('../util')
const OrderHeader = require('../models/OrderHeader')
const OrderDetail = require('../models/OrderDetail')
const Accessory = require('../models/Accessory')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')
const path = require('path')
const ExcelJS = require('exceljs')
const appRoot = require('app-root-path')

const serverHostname = process.env.HOSTNAME;
const serverPort = process.env.PORT;


exports.index = (req, res, next) => {
  let page = req.query.page || 1
  let size = req.query.size || 10
  let sort = req.query.sort || 'OrderHeader.id'
  let sortDirection = req.query.sort ? (req.query.desc ? 'desc' : 'asc') : 'asc'
  let column = req.query.sc
  let query = knex('OrderHeader')
    .leftJoin('Product', 'OrderHeader.product_id', 'Product.id')
    .select('OrderHeader.id', 'OrderHeader.product_id', 'Product.name as product_name', 'OrderHeader.order_date')
    .orderBy(sort, sortDirection)
  let columns = query._statements.find(e => e.grouping == 'columns').value
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403)
  }
  if (req.query.sw) {
    let search = req.query.sw
    let operator = util.getOperator(req.query.so)
    if (column == 'OrderHeader.order_date') {
      search = util.formatDateStr(search)
    }
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
  ]).then(([count, orderHeaders]) => {
    let last = Math.ceil(count.count / size)
    res.send({ orderHeaders, last })
  }).catch(next)
}

exports.getAll = (req, res, next) => {
  let sqlOrderHeader = knex('OrderHeader')
    .select('OrderHeader.id')
    .toString()
  db.query(sqlOrderHeader, { type: 'SELECT' }).then(orderHeaders => {
    res.send({ orderHeaders })
  }).catch(next)
}

exports.getCreate = (req, res, next) => {
  let sqlProduct = knex('Product')
    .select('Product.id', 'Product.name')
    .toString()
  db.query(sqlProduct, { type: 'SELECT' }).then(products => {
    res.send({ products })
  }).catch(next)
}

exports.create = (req, res, next) => {
  let orderHeader = util.parseData(OrderHeader, { ...req.body })
  orderHeader.order_date = new Date()
  OrderHeader.create(orderHeader).then(() => {
    res.end()
  }).catch(next)
}

exports.excel = async (req, res, next) => {
  let orderHeader = util.parseData(OrderHeader, { ...req.body })
  Array.from(['excel']).forEach(e => {
    if (req.files[e]) {
      orderHeader[e] = req.files[e][0].filename
    }
  })
  let filePath = `${appRoot.path}/uploads/orderHeaders/${orderHeader['excel']}`
  // Read the Excel file
  let data = new Array()
  readXlsxFile(filePath).then((rows) => {
    // Loop through every row
    for (let i = 6; i < rows.length; i++) {
      // Get the current row
      let row = rows[i]
      // Stop processing if the 4th column is null
      if (!row[3]) break;
      let newDetail = new Object()
      newDetail.designators = row[0] ? row[0] : '-'
      newDetail.qty = row[1] ? row[1] : '-'
      newDetail.value = row[2] ? row[2] : '-'
      newDetail.footprint = row[3] ? row[3] : '-'
      newDetail.data = row[4] ? row[4] : '-'
      newDetail.manufacturer = row[5] ? row[5] : '-'
      newDetail.info = row[6] ? row[6] : '-'
      newDetail.order_id = orderHeader.id
      data.push(newDetail)
    }


    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("An error occurred:", err);
        throw err;
      }
      console.log('File was deleted successfully');
    });

    let promises = data.map(orderDetail => {
      return Accessory.findOne({ where: { footprint: orderDetail.footprint, value: orderDetail.value } })
        .then(accessory => {
          if (!accessory) {
            // If the footprint doesn't exist in the Accessory table, create a new Accessory
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
                if (!existDetail) {
                  OrderDetail.create({ ...orderDetail, accessory_id: accessory.id }).then()
                }
              })

          }
        })
        .catch(next)
    });

    Promise.all(promises)
      .then(() => {
        res.end()
      })
      .catch(next)

  }).catch(next)
}

exports.get = (req, res, next) => {
  let sqlOrderHeader = knex('OrderHeader')
    .leftJoin('Product', 'OrderHeader.product_id', 'Product.id')
    .select('OrderHeader.id', 'Product.name as product_name', 'OrderHeader.order_date')
    .where('OrderHeader.id', req.params.id)
    .toString()
  let sqlOrderHeaderOrderDetail = knex('OrderHeader')
    .join('OrderDetail', 'OrderHeader.id', 'OrderDetail.order_id')
    .join('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select('OrderDetail.id', 'OrderDetail.part_number', 'OrderDetail.order_id', 'OrderDetail.designators', 'OrderDetail.accessory_id', 'OrderDetail.qty', 'Accessory.footprint as footprint', 'Accessory.value as value', 'Accessory.data as data', 'Accessory.info as info')
    .where('OrderHeader.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlOrderHeader, { type: 'SELECT', plain: true }),
    db.query(sqlOrderHeaderOrderDetail, { type: 'SELECT' })
  ]).then(([orderHeader, orderHeaderOrderDetails]) => {
    res.send({ orderHeader, orderHeaderOrderDetails })
  }).catch(next)
}

exports.getFromProduct = (req, res, next) => {
  let sqlOrderHeader = knex('OrderHeader')
    .leftJoin('Product', 'OrderHeader.product_id', 'Product.id')
    .select('OrderHeader.id', 'Product.name as product_name', 'OrderHeader.order_date')
    .where('OrderHeader.product_id', req.params.id)
    .toString()
  let sqlOrderHeaderOrderDetail = knex('OrderHeader')
    .join('OrderDetail', 'OrderHeader.id', 'OrderDetail.order_id')
    .join('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select('OrderDetail.id', 'OrderDetail.order_id', 'OrderDetail.designators', 'OrderDetail.accessory_id', 'OrderDetail.qty', 'Accessory.footprint as footprint', 'Accessory.manufacturer as manufacturer', 'Accessory.value as value', 'Accessory.data as data', 'Accessory.info as info')
    .where('OrderHeader.product_id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlOrderHeader, { type: 'SELECT', plain: true }),
    db.query(sqlOrderHeaderOrderDetail, { type: 'SELECT' })
  ]).then(([orderHeader, orderHeaderOrderDetails]) => {
    res.send({ orderHeader, orderHeaderOrderDetails })
  }).catch(next)
}

exports.edit = (req, res, next) => {
  let sqlOrderHeader = knex('OrderHeader')
    .join('Product', 'OrderHeader.product_id', 'Product.id')
    .select('OrderHeader.id', 'OrderHeader.product_id', 'OrderHeader.order_date', 'Product.name as product_name', 'Product.n_f as n_f')
    .where('OrderHeader.id', req.params.id)
    .toString()
  let sqlOrderHeaderOrderDetail = knex('OrderHeader')
    .join('OrderDetail', 'OrderHeader.id', 'OrderDetail.order_id')
    .join('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select('OrderDetail.id', 'OrderDetail.designators', 'OrderDetail.part_number', 'Accessory.footprint as footprint', 'OrderDetail.qty', 'OrderDetail.order_id', 'Accessory.data as data', 'Accessory.value as value', 'Accessory.manufacturer as manufacturer', 'Accessory.info as info')
    .where('OrderHeader.id', req.params.id)
    .toString()
  let sqlProduct = knex('Product')
    .select('Product.id', 'Product.name')
    .toString()
  Promise.all([
    db.query(sqlOrderHeader, { type: 'SELECT', plain: true }),
    db.query(sqlOrderHeaderOrderDetail, { type: 'SELECT' }),
    db.query(sqlProduct, { type: 'SELECT' })
  ]).then(([orderHeader, orderHeaderOrderDetails, products]) => {
    res.send({ orderHeader, orderHeaderOrderDetails, products })
  }).catch(next)
}

exports.update = (req, res, next) => {
  let orderHeader = util.parseData(OrderHeader, { ...req.body })
  OrderHeader.update(orderHeader, { where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}

exports.getDelete = (req, res, next) => {
  let sqlOrderHeader = knex('OrderHeader')
    .leftJoin('Product', 'OrderHeader.product_id', 'Product.id')
    .select('OrderHeader.id', 'Product.name as product_name', 'OrderHeader.order_date')
    .where('OrderHeader.id', req.params.id)
    .toString()
  let sqlOrderHeaderOrderDetail = knex('OrderHeader')
    .join('OrderDetail', 'OrderHeader.id', 'OrderDetail.order_id')
    .join('Accessory', 'OrderDetail.accessory_id', 'Accessory.id')
    .select('OrderDetail.id', 'OrderDetail.order_id', 'OrderDetail.part_number', 'OrderDetail.designators', 'OrderDetail.accessory_id', 'OrderDetail.qty', 'Accessory.footprint as footprint', 'Accessory.value as value', 'Accessory.data as data', 'Accessory.info as info')
    .where('OrderHeader.id', req.params.id)
    .toString()
  Promise.all([
    db.query(sqlOrderHeader, { type: 'SELECT', plain: true }),
    db.query(sqlOrderHeaderOrderDetail, { type: 'SELECT' })
  ]).then(([orderHeader, orderHeaderOrderDetails]) => {
    res.send({ orderHeader, orderHeaderOrderDetails })
  }).catch(next)
}

exports.delete = (req, res, next) => {
  OrderHeader.destroy({ where: { id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
  OrderDetail.destroy({ where: { order_id: req.params.id } }).then(() => {
    res.end()
  }).catch(next)
}

exports.export = async (req, res, next) => {
  let data = JSON.parse(req.body.data)
  // Combine objects with the same footprint and value
  let result = []
  let total_data = []
  
  data?.forEach(item => {
    item?.forEach(one_data => {
      total_data?.push(one_data)
    })
  })

  total_data.forEach(function (item) {
    var existing = result.find(function (r) {
      return r.footprint === item.footprint && r.value === item.value;
    })

    if (existing) {
      existing.qty += item.qty;
    } else {
      result.push({
        id: item.id,
        order_id: item.order_id,
        designators: item.designators,
        accessory_id: item.accessory_id,
        qty: item.qty,
        footprint: item.footprint,
        manufacturer: item.manufacturer,
        value: item.value,
        data: item.data,
        info: item.info
      })
    }
  })

  // Create a new workbook and a new worksheet
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')

  // Define columns in the worksheet
  worksheet.columns = [
    { header: 'Footprint', key: 'footprint', width: 40 },
    { header: 'Qty', key: 'qty', width: 10 },
    { header: 'Value', key: 'value', width: 30 },
    { header: 'Data', key: 'data', width: 40 },
    { header: 'Manufacturer', key: 'manufacturer', width: 30 },
    { header: 'Info', key: 'info', width: 40 },
  ];

  // Add rows to the worksheet
  result.forEach((item, index) => {
    worksheet.addRow(item)
  });

  let exportDir = `${appRoot.path}/export`
  // Define the export directory and filename
  let filename = `${req.user.id}-${Date.now()}.xlsx`
  let filePath = `${appRoot.path}/export/${filename}`

  // Ensure the export directory exists
  fs.mkdirSync(exportDir, { recursive: true })

  // Write to file
  await workbook.xlsx.writeFile(filePath)

  // Return the download link
  res.send({ link: `${serverHostname}:${serverPort}/export/${filename}` })
}
