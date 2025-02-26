require('dotenv').config(); // .env 파일 로드

const env = process.env.NODE_ENV || 'development';

// 환경별 설정 관리
const config = {
    development: {
        DB_HOST: process.env.DB_HOST_DEV || 'localhost',
        DB_USER: process.env.DB_USER_DEV || 'root',
        DB_PASS: process.env.DB_PASS_DEV || 'root',
        DB_NAME: process.env.DB_NAME_DEV || 'Youtube_dev',
        DB_PORT: process.env.DB_PORT_DEV || 3307,
        PORT: process.env.PORT || 3007
    },
    production: {
        DB_HOST: process.env.DB_HOST_PROD,
        DB_USER: process.env.DB_USER_PROD,
        DB_PASS: process.env.DB_PASS_PROD,
        DB_NAME: process.env.DB_NAME_PROD,
        DB_PORT: process.env.DB_PORT_PROD,
        PORT: process.env.PORT || 8080
    }
};

// 환경 변수 유효성 검사 (필수 값이 없으면 에러 발생)
const requiredKeys = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME', 'DB_PORT', 'PORT'];

requiredKeys.forEach(key => {
    if (!config[env][key]) {
        console.error(`🚨 환경 변수 오류: ${key} 값이 설정되지 않았습니다.`);
        process.exit(1); // 필수 값이 없으면 서버 실행 중단
    }
});

module.exports = config[env];
