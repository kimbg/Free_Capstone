const express = require('express');
const router = express.Router();
const mysql = require('../src/ggot_mysql')._mysql      //mysql

//로그아웃
router.get('/', (req, res)=> {
    res.sendFile('/kakao-Map.html', {root : `Front/html`})
})

router.post('/getMarkers',(req,res)=> {
    mysql.getConnection((err,conn)=> {
        conn.query(`select * from noticeboard`,(err,result)=> {
            if(err){
                console.log("err1")                
            }
            else if(!result[0]){
                console.log("err2");
            }

            conn.release();
            res.send(result);
        })
    })
})

router.get('/registerCoords',(req,res)=> {
    res.sendFile('/registerCoords.html', {root : `front/html`})
})

router.post('/submitCoords',(req,res)=> {
    mysql.getConnection((err,conn)=> {
        conn.query(`insert into markers (lat,lng) values(?,?)`,[req.body.lat,req.body.lng],(err,result)=> {
            if(err){
                console.log("err1");                
                console.log(err);
            }           
            conn.release();
            
        })
    })
    console.log("res.redirect('/')");
    res.status(200).send({result : 'redirect'});
})

module.exports = router;