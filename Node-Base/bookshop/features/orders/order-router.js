const express = require('express');
const router = express.Router();
const { getOrderItems, updateOrderItem} = require('./order-controller');


router
    .route('/')
    .get(
        getOrderItems
    )
    .put(
        updateOrderItem
    );

router
    .route('/?userId=userId')
    .get(
        getOrderItems
    );



module.exports = router;
