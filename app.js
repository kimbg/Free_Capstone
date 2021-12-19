const express = require('express')                  //express 프레임워크
const ggot_router = require('./route/ggot_router')  //라우터

const app = express()
require('./src/ggot_session')(app)                  //session

//정적 파일 제공
app.use('/static', express.static(__dirname + '/front'))
app.use('/photo', express.static(__dirname + '/image'))
app.use('/profile', express.static(__dirname + '/profile'))

//post 로 넘겨준 값을 body. 으로 읽기 가능하게
app.use(express.urlencoded({extended:false}))

app.use('/', ggot_router)

app.listen(3000, () => console.log('listening on port 3000!')) //서버오픈