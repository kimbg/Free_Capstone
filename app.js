var express = require('express');
var app = module.exports = express();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
require('dotenv').config();

// session 을 생성하고 db 에 저장
app.use(session({
	secret              : 'secret',
	resave              : false,
	saveUninitialized   : true, //이거false시 세션 데이터가 저장이 안되서 true로 바꿔놨음
    store : new MySQLStore({
        host : 'localhost',
        user : 'root',
        password : '2wndeo12#',
        database : 'opentutorials'
    })
}));

app.use(express.static('Front/'));
app.use(express.urlencoded({extended:false}));
const passport = require('./passport')(app);

app.use('/login',loginRouter);
app.use('/join',registerRouter);
//아래 두코드는 보류
//app.use('/auth/google',authRouter.google);
//app.use('/auth/kakao',authRouter.kakao);


//메인 페이지
app.get('/', (req, res)=> {
   if(req.user) res.sendFile(__dirname+ '/Front/html/mainTest.html');
   else res.redirect('/login');
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

