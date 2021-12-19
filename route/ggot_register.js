const express = require('express');
const router = express.Router();
const mysql = require('../src/ggot_mysql')._mysql      //mysql

//회원가입 요청 처리
router.post('/', (req, res) => {
    const sql = `INSERT INTO user (id, password, name, createtime) VALUES(?, ?, ?, now())` 
    mysql.query(sql, [req.body.id, req.body.pw, req.body.name], (err,user) => {
        if(err) {
            //오류 메세지?
        }
        else {
            //성공 메세지?
        }
        res.redirect('/login')
    })
})

module.exports = router;