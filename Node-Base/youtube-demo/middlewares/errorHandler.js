const errorHandler = (err, req, res, next) => {
    console.error("❌ 서버 오류 발생:", err);
    res.status(500).json({ status: 'error', message: '서버 오류 발생' });
};

module.exports = errorHandler;
