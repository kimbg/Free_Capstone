const mysql = require('mysql');

//옵션
const options = {
    host        : 'localhost',          // 데이터베이스 연결을 위한 호스트 이름
    port        : 3306,                 // 데이터베이스 연결을 위한 포트 번호
    user        : 'root',               // 데이터베이스 사용자
    password    : '100001',             // 위 데이터베이스 사용자의 비밀번호
    database    : 'ggot',               // 데이터베이스 이름
};

// DB 접속 pool 생성
const pool = mysql.createPool(options);

module.exports = {
    _mysql : pool,
}