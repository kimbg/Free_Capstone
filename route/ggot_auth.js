const express = require('express')
const router = express.Router()
const passport = require('../src/ggot_passport')(router)  //passport

router.get('/google',
    passport.authenticate('google',{
        scope : ['https://www.googleapis.com/auth/plus.login','email']
    })
)

router.get('/google/callback', //누가 이 url로 접촉을 시도하면
    passport.authenticate('google', { //passport가 로그인을 시도하고
        failureRedirect : '/login' //실패하면 다시 로그인으로 redirect 
    }),
    (req,res)=> { //성공할경우 
        req.session.save(()=> {
            res.redirect('/')
        })
    }
)

router.get('/kakao', passport.authenticate('kakao-login'))

router.get('/kakao/callback',
    passport.authenticate('kakao-login', {
        failureRedirect : '/login'
    }), 
    (req,res) => {
        req.session.save(() => {
            res.redirect('/')
        })
    }
)

module.exports = router