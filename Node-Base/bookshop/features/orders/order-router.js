const express = require('express');
const router = express.Router();
const {  getOrderItems, updateOrderItem} = require('./order-controller');


router
    .route('/')
    .put(
        updateOrderItem
    );

router
    .route('/order-items')
    .get(
        getOrderItems
    );



module.exports = router;
