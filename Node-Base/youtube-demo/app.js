const express = require('express');
const app = express();

app.listen(3000);

//user-demo router

const userRouter = require('./routes/users');

app.use('/',userRouter);


//channel-demo router

const channelRouter = require('./routes/channels');

app.use('/channels', channelRouter);