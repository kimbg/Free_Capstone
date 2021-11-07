var express = require('express');
var app = module.exports = express();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// DB 접속
var options = {
    host        : 'localhost',
    user        : 'root',
    password    : '100001',
    database    : 'ggot',

	clearExpired : true , // 만료된 세션 자동 확인 및 지우기 여부: 
	checkExpirationInterval : 900000 , // 만료된 세션이 지워지는 빈도; milliseconds: 
	//만료 : 864 // 유효한 세션의 최대 기간. milliseconds: 
};
var db = mysql.createConnection(options);
db.connect();

// session 을 생성하고 db 에 저장
var sessionStore = new MySQLStore({}/* session store options */, db);
app.use(session({
	secret              : 'secret',
	resave              : false,
	saveUninitialized   : false,
    store               : sessionStore
}));

//Front 를 static 으로
app.use(express.static('Front/'));

//body-parser 이 express 에 내장된듯?
//post 로 넘겨준 값을 body. 으로 읽기 가능
app.use(express.urlencoded({extended:false}));

//sessionStore.close();
//connection.end();

//로그인이 안되어있을 때 모든 접속을 /login 으로 보냄
app.get('*', (req, res, next)=> {  
    if(req.session.is_logined != true && req.url != '/login') {
        res.redirect('/login');
    }
    else {
        next();
    }
})

//로그인 페이지 전송, 이미 로그인이 되어있을 땐 / 으로 보냄
app.get('/login', (req, res)=> {
    if(req.session.is_logined == true) {
        res.redirect('/');
    }
    else{
        res.sendFile(__dirname + '/Front/html/login.html');
    }
})

//로그인 요청 처리
app.post('/login', (req, res) => {
    db.query(`SELECT * FROM users WHERE id = ? AND password = ?`, [req.body.id, req.body.pw], (err,user) => {
        if(!user[0]) {
            //오류 메세지?
            res.redirect('/login');
        }
        else {
            req.session.is_logined = true;
            res.redirect('/');
        }
    });
})

app.post('/join', (req, res) => {
    db.query(`INSERT INTO users (id, password) VALUES(?, ?)`, [req.body.id, req.body.pw], (err,user) => {
        
        if(err) {
            //오류 메세지?
        }
        else {
            //성공 메세지?
        }
        res.redirect('/login');
    });
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
    /*
    delete req.session.is_logined;
    req.session.save(() => {
        res.redirect('/login');
    });
    */
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

