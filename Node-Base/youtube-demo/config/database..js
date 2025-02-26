require('dotenv').config(); // 환경 변수 로드
const databaseConfig = {
    development: {
        host: process.env.DB_HOST_DEV || 'localhost',
        user: process.env.DB_USER_DEV || 'root',
        password: process.env.DB_PASS_DEV || 'root',
        database: process.env.DB_NAME_DEV || 'Youtube_dev',
        port: process.env.DB_PORT_DEV || 3306
    },
    production: {
        host: process.env.DB_HOST_PROD,
        user: process.env.DB_USER_PROD,
        password: process.env.DB_PASS_PROD,
        database: process.env.DB_NAME_PROD,
        port: process.env.DB_PORT_PROD
    },
    test: {
        host: process.env.DB_HOST_TEST || 'localhost',
        user: process.env.DB_USER_TEST || 'test_user',
        password: process.env.DB_PASS_TEST || 'test_pass',
        database: process.env.DB_NAME_TEST || 'Youtube_test',
        port: process.env.DB_PORT_TEST || 3306
    }
};

const env = process.env.NODE_ENV || 'development';
module.exports = databaseConfig[env];
