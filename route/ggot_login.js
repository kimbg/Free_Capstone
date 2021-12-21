const express = require('express')
const router = express.Router()
const passport = require('../src/ggot_passport')(router)  //passport
const mysql = require('../src/ggot_mysql')._mysql      //mysql

//로그인 페이지 전송
router.get('/', (req, res) => {
    res.sendFile('/login.html', {root : `Front/html`})
})

//로그인 요청 처리
router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    (req,res) => {
        req.session.save(()=> {
            res.redirect('/')
        })
    }
)

router.post('/find_id', (req, res) => {
    const sql = 'select * from user where name = ? and birth = ?'
    mysql.query(sql, [req.body.name, req.body.birth], (err, results) => {
        if(err)
            console.log(err)
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})


module.exports = router