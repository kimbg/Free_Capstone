const express = require('express')                  //express 프레임워크
const router = express.Router()

//라우터
const login_router = require('./ggot_login')
const auth_router = require('./ggot_auth')
const logout_router = require('./ggot_logout')
const register_router = require('./ggot_register')
const page_router = require('./ggot_page')
const map_router = require('./ggot_map')

//메인 페이지 리다이랙트
router.get('/', (req, res) => {
    res.redirect('/page/main')
})

//접속제어 (로그인 여부에 따른 접속제어)
router.use('/page', (req, res, next) => {
    if(!req.session.passport)
        res.redirect('/login')
    else
        next()
})
router.use('/login', (req, res, next) => {
    if(req.session.passport)
        res.redirect('/page/main')
    else
        next()
})

//라우터 사용
router.use('/login', login_router)
router.use('/auth', auth_router)
router.use('/logout', logout_router)
router.use('/register', register_router)
router.use('/page', page_router)
router.use('/map', map_router)

module.exports = router