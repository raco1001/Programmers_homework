// require("../shared/utils/instrument.js");

// const Sentry = require("@sentry/node");
const express = require('express');

const app = express();

// const errorHandler = require('../shared/middlewares/errorHandler');



const authRouter = require('../features/auth/auth-router');
const userRouter = require('../features/users/user-router');
const bookRouter = require('../features/books/book-router');
// const cartRouter = require('../features/carts/cart-router');
// const orderRouter = require('../features/orders/orderRouter');

// const likeRouter = require('../features/likes/likeRouter');
// const reviewRouter = require('../features/reviews/reviewRouter');
// const paymentRouter = require('../features/payments/paymentRouter');
// const deliveryRouter = require('../features/deliveries/deliveryRouter');


app.use(express.json());


app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);
// app.use('/likes', likeRouter);
// app.use('/reviews', reviewRouter);

// app.use('/carts', cartRouter);
// app.use('/orders', orderRouter);
// app.use('/payments', paymentRouter);
// app.use('/deliveries', deliveryRouter);

// Sentry.setupExpressErrorHandler(app);
// app.use(errorHandler);


module.exports = app; 
