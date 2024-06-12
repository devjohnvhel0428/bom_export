require('dotenv').config();
const express = require('express')
const cors = require('cors')
const authen = require('./middleware/authen')
const router = require('./router.js')
const util = require('./util')

const serverHostname = process.env.HOSTNAME;
const serverPort = process.env.PORT;

const app = express();
app.use(cors(), express.json());
app.use('/uploads', express.static('uploads'));
app.use('/export', express.static('export'));
app.use('/api', authen, router);
app.use((err, req, res, next) => {
  res.status(500).send(util.getError(err));
});
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});