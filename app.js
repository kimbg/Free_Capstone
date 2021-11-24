var express = require('express');
var app = express();
var mysql = require('./config')._mysql;
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
require('dotenv').config();

const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination : (req,file,cb)=> {cb(null,__dirname + '/Image');},
    filename : (req,file,cb) => {
        let fname = file.originalname;
        let dotPosition = fname.length - 4;
        let frontName = fname.substr(0,dotPosition);
        let backName = fname.substr(dotPosition,fname.length);
        let i = 1;

        while(fs.existsSync(`./image/${fname}`))
        {
            fname = frontName + `(${i})` + backName;        
            i++;            
        }
        
        mysql.getConnection((err,conn)=> {
            conn.query(`insert into noticeBoard (userid,comment) values('김병관',?)`,[fname],(err,result)=> {
                conn.release();
                if(err){
                    console.log('err1');
                }                
                else cnt = result[0].length;                
            })
        })  
        
        cb(null,fname);
    }
})
const upload = multer({storage : storage});

// session 을 생성하고 db 에 저장

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

app.use(express.static('Front/'));
app.use(express.urlencoded({extended:false}));
const passport = require('./passport')(app);



app.use('/login',loginRouter);
app.use('/join',registerRouter);
app.use('/auth',authRouter);

///*testcode

app.post('/write',upload.single('myfile'),(req,res)=>{    
    res.redirect('/main');
})

app.get('/image/:id',(req,res)=> {
    console.log(req.params.id);
    res.sendFile(__dirname + `/Image/${req.params.id}.jpg`);
})

app.post('/receiveDbLength',(req,res)=> {
    var cnt = 0;
    console.log("receiveDbLength ajax receive!");
    mysql.getConnection((err,conn)=> {
        conn.query(`select count(*) as length from noticeBoard`,(err,result)=> {
            if(err){
                console.log(err);
                console.log('err1');
            }
            else if(!result[0]) {
                console.log("결과 없음");
            }
            else cnt = result[0].length;
            conn.release();
            res.status(200).send(cnt.toString());
        })
    })  
})

app.post('/sendajax',(req,res)=> {
    console.log("receive ajax!");
    mysql.getConnection((err,conn)=> {
        conn.query(`select * from noticeBoard where num = ?`,[req.body.num],(err,result)=> {
            if(err){
                console.log(err);                
                sendData = 'noData';
                //return res.redirect('/login');
            }
            else if(!result[0]){
                console.log('결과 없음');
                sendData = 'noData';
                //return res.json({data : null});
            }
            else sendData = result;

            console.log(result);
            conn.release();
            //res.json({data : sendData});
            res.send(sendData);
        })
    })  
})



//*///testcode


//메인 페이지
app.get('/', (req, res)=> {    
  res.redirect('/login');
})

app.get('/main',(req,res)=>{
    res.sendFile(__dirname + '/Front/html/mainTest.html');
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

