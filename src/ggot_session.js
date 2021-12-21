const mysql = require('./ggot_mysql.js')._mysql;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// session 옵션
const sessionOptions = {
    clearExpired : true,                // 만료된 세션 자동 확인 및 지우기 여부
    checkExpirationInterval : 900000,   // 만료된 세션이 지워지는 빈도 milliseconds
    expiration: 86400000,               // 유효한 세션의 최대 기간 milliseconds
    createDatabaseTable : true,         // 세션 데이터베이스 테이블 생성 여부, 존재하지 않는 경우
};

const sessionStore = new MySQLStore(sessionOptions, mysql);

module.exports = (app) => {
    // session 사용
    app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    //sessionStore.close();
}
