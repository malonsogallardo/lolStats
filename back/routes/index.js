const express = require('express');
const router  = express.Router();
const { getData } = require("../lib");

/* GET home page */
router.get('/', (req, res, next) => {
  getData()
  res.render('index');
});

module.exports = router;
