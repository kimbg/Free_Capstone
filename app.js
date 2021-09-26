const express  = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static('Front/'));

//이 코드를 통해 req.body.id 와 같이 값을 불러올수 있음
app.use(express.urlencoded({extended:false}));

//로그인 정보가 담길 배열
var user = [];


app.get('/', (req,res) => {
    res.status(200).sendFile(__dirname + '/Front/html/login.html');
})

//로그인시 메인 화면으로 이동
app.post('/login',(req,res) => {
    user.push({
        id : req.body.id,
        pw : req.body.pw
    });
    console.log(user);
    console.log("가 로그인을 했습니다");
    res.sendFile(__dirname+ '/Front/html/mainTest.html');
})

app.post('/join',(req,res) => {
    user.push({
        id : req.body.id,
        pw : req.body.pw,
        log_stay : req.body.login_stay,
        name : req.body.name,
        birth : req.body.birth
    })
    console.log(user);
    console.log("의 정보로 회원가입을 함");
})



app.listen(port, (err,data) => {
    console.log(`The Server is listening on ${port}`);
});

