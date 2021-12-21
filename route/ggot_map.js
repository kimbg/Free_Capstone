const express = require('express');
const router = express.Router();
const mysql = require('../src/ggot_mysql')._mysql      //mysql

//로그아웃
router.get('/', (req, res)=> {
    console.log('req.session : ',req.session);
    res.sendFile('/kakao-Map.html', {root : `Front/html`})
})

router.post('/getMarkers',(req,res)=> {
    mysql.getConnection((err,conn)=> {
        conn.query(`select * from noticeboard`,(err,result)=> {
            if(err){
                console.log("err1")                
            }
            else if(!result[0]){
                console.log("getMarkers err2");
            }

            let sendMessage = {
                DBdata : result,
                user : req.session.passport
            }
            
            conn.release();
            res.send(sendMessage);
        })
    })
})

router.get('/registerCoords/:id1/:id2',(req,res)=> {
    res.sendFile('/registerCoords.html', {root : `front/html`})
})

router.post('/submitCoords',(req,res)=> {
    
    mysql.getConnection((err,conn)=> {
        let sql = `SELECT number FROM noticeboard where user_id = ? ORDER BY date DESC LIMIT 1;`
        conn.query(sql,[req.session.passport.user.id],(err,result)=> {
            if(err)
                console.log(err);
            else if(!result.length)
                console.log("no data Err");

            sql = `UPDATE noticeboard SET lat = ?, lng = ? WHERE number = ?`;
            conn.query(sql,[req.body.lat,req.body.lng,result[0].number],(err,result2)=> {
                if(err)
                    console.log("double query in err1 at /submitCoords");
                if(!result2[0])
                    console.log("update successfully");
            });
            conn.release();
            
        })
    })
    console.log("res.redirect('/')");
    res.status(200).send({result : 'redirect'});
})

module.exports = router;