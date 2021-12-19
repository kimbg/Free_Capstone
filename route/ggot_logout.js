const express = require('express');
const router = express.Router();

//로그아웃
router.get('/', (req, res)=> {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

module.exports = router;