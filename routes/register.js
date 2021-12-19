const express = require('express');
const router = express.Router();
const mysql_ = require('../config')._mysql;

router.post('/', (req, res) => {
    // mysql_.getConnection((err,conn)=> {
    //     conn.query(`insert into user values (?,?)`,[req.body.id,req.body.pw],(err,result)=> {
    //         conn.release();
    //         if(err){
    //             //primary key를 통해 중복된 아이디나 다른 db문제로 로그인이 안될경우
    //             //아래와 같이 다시 register를 redirect하게하고 ajax를 통해 알림을 생성하면 될듯하다.
    //             console.log(err);                
    //             return res.redirect('/login');
    //         }
    //         console.log(result);
            
    //         res.redirect('/');
    //     })
    // })
    console.log('데이터 들어온 값 : ',req.body);
    console.log('아이디 값은?',req.body.id);
    let sqlQuery1 = 'select * from user where id = ?';
    let sqlQuery2 = 'insert into user values (?,?,?,?,now())';
    mysql_.getConnection((err,conn)=> {
        conn.query(sqlQuery1,[req.body.id],(err,result)=> {
            if(err){
                console.log(err);
            }
            else if(!result[0]) {
                console.log("결과 없음 즉 얘로 생성 가능하다는 뜻");
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
            else { //얘는 결과가 있으니까 안됨
                return res.send({data : 'not'})
            }
        })
    })
    
})

module.exports = router;