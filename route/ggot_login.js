const express = require('express')
const router = express.Router()
const passport = require('../src/ggot_passport')(router)  //passport

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

module.exports = router