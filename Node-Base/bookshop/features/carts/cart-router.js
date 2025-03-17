const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, updateCartItem, deleteFromCart} = require('./cart-controller');


router
    .route('/')
    .get(
        getCartItems
    )
    .post(
        addToCart
    )    
    .put(
        updateCartItem
    )
    .delete(
        deleteFromCart
    );

router
    .route('/?userId=userId')
    .get(
        getCartItems
    );

module.exports = router;
