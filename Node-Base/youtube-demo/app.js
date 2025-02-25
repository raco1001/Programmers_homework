const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const channelRouter = require('./routes/channels');


app.listen(3000);


//auth router
app.use('/auth',authRouter );

//user router
app.use('/users',userRouter);


//channel router
app.use('/channels', channelRouter);