const express = require('express');
const app = express();
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const bookRouter = require('./routes/bookRouter');
const likeRouter = require('./routes/likeRouter');
const reviewRouter = require('./routes/reviewRouter');
const paymentRouter = require('./routes/paymentRouter');
const deliveryRouter = require('./routes/deliveryRouter');



const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());


app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/books', bookRouter);
app.use('/likes', likeRouter);
app.use('/reviews', reviewRouter);

app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);
app.use('/deliveries', deliveryRouter);

app.use(errorHandler);

module.exports = app; 
