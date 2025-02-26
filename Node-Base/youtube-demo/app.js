const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const channelRouter = require('./routes/channel');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// 라우터 설정
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/channels', channelRouter);

// 전역 에러 핸들러
app.use(errorHandler);

module.exports = app; // 서버 실행과 분리
