const express = require('express');
const app = express();

const mysql = require('./DB.js')._mysql;        //mysql 모듈화

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// session 옵션
const sessionOptions = {
    clearExpired : true,                // 만료된 세션 자동 확인 및 지우기 여부
    checkExpirationInterval : 900000,   // 만료된 세션이 지워지는 빈도 milliseconds
    expiration: 86400000,               // 유효한 세션의 최대 기간 milliseconds
    createDatabaseTable : true,         // 세션 데이터베이스 테이블 생성 여부, 존재하지 않는 경우
};

// session 을 생성하고 db 에 저장
const sessionStore = new MySQLStore(sessionOptions, mysql);
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
//sessionStore.close();

const passport = require('./passport')(app);    //passport 모듈화

//static 으로
app.use(express.static('Front/'));

//post 로 넘겨준 값을 body. 으로 읽기 가능?
app.use(express.urlencoded({extended:false}));

//로그인이 안되어있을 때 모든 접속을 /login 으로 보냄
app.get('*', (req, res, next)=> {  
    if(!req.user && req.url != '/login') {
        res.redirect('/login');
    }
    else {
        next();
    }
})

//로그인 페이지 전송, 이미 로그인이 되어있을 땐 / 으로 보냄
app.get('/login', (req, res)=> {
    if(req.user) {
        res.redirect('/');
    }
    else {
        res.sendFile(__dirname + '/Front/html/login.html');
    }
})

//로그인 요청 처리
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//회원가입 요청 처리
app.post('/join', (req, res) => {
    mysql.getConnection((err,conn)=> {
        conn.query(`INSERT INTO users (id, password) VALUES(?, ?)`, [req.body.id, req.body.pw], (err,user) => {
            conn.release();
            if(err) {
                //오류 메세지?
            }
            else {
                //성공 메세지?
            }
            res.redirect('/login');
        })
        mysql.releaseConnection(conn);
    })
})

//메인 페이지
app.get('/', (req, res)=> {
    res.sendFile(__dirname+ '/Front/html/mainTest.html');
})

//로그아웃
app.get('/logout', (req, res)=> {
    req.session.destroy(() => {
        res.redirect('/login');
    });
})

//이미지 제공
app.get('/image/:id',(req,res)=> {
    res.sendFile(__dirname + `/Image/${req.params.id}.jpg`);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
