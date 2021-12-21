const express = require('express');
const router = express.Router();
const mysql = require('../src/ggot_mysql')._mysql      //mysql

//회원가입 요청 처리
router.post('/', (req, res) => {
    let sqlQuery1 = 'select * from user where id = ?';
    let sqlQuery2 = 'insert into user values (?,?,?,?,now())';
    mysql.getConnection((err,conn)=> {
        conn.query(sqlQuery1,[req.body.id],(err,result)=> {
            if(err){
                console.log(err);
            }
            else if(!result[0]) {
                conn.query(sqlQuery2,[req.body.id,req.body.pw,req.body.name,req.body.birth],(err,result)=> {
                    if(err) {
                        console.log(err);
                    }
                    else if(!result[0]){
                        return res.send({data : 'success'})
                    }
                    else console.log("wtf");
                })
            }
            else {
                return res.send({data : 'not'})
            }
        })
    })
})

module.exports = router;