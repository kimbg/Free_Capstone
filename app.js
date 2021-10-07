const express  = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static('Front/'));

//이 코드를 통해 req.body.id 와 같이 값을 불러올수 있음
//post내부만 가능한것인가? 그건 잘 모르겠다
app.use(express.urlencoded({extended:false}));

//로그인 정보가 담길 배열
var user = [];


app.get('/', (req,res) => {
    res.status(200).sendFile(__dirname + '/Front/html/login.html');
})

app.get('/login',(req,res)=> {
    res.sendFile(__dirname + '/Front/html/login.html');
})


//로그인시 메인 화면으로 이동
app.post('/login',(req,res) => {
    try
    {
        user.push({
            id : req.body.id,
            pw : req.body.pw
        });
        console.log(user);
        console.log("가 로그인을 했습니다");
        
        res.sendFile(__dirname+ '/Front/html/mainTest.html');
    }
    catch
    {
        res.redirect('/login');
        console.log("로그인 실패 login화면으로 재접속");
    }
})

app.post('/join',(req,res) => {
    try
    {
        user.push({
            id : req.body.id,
            pw : req.body.pw,
            log_stay : req.body.login_stay,
            name : req.body.name,
            birth : req.body.birth
        })
        console.log(user);
        console.log("의 정보로 회원가입을 함");
    }
    catch{ 
        //회원가입 안된경우 이부분은 javascript코드로 대체 해야할듯? 
        //로그인, 회원가입 페이지가 분리되어 있지않아서 javascript코드로 짜야할듯
    }
})



app.listen(port, (err,data) => {
    console.log(`The Server is listening on ${port}`);
});

