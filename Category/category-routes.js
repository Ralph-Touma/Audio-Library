const express = require('express');
const categoryController = require('../Category/category-controller');

const router = express.Router();

router.post('/', categoryController.addCategory);


module.exports = router;
