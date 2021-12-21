const express = require('express')
const router = express.Router()
const mysql = require('../src/ggot_mysql')._mysql      //mysql
const upload = require('../src/ggot_multer')._upload

router.get('/main', (req, res) => {
    res.sendFile('/main.html', {root : `Front/html`})
})

router.get('/user/:id', (req, res) => {
    res.sendFile('/main.html', {root : `Front/html`})
})

router.get('/post/:id', (req, res) => {
    res.sendFile('/main.html', {root : `Front/html`})
})

router.post('/getuser', (req, res) => {
    const sql = 'SELECT * FROM user WHERE id = ?'
    mysql.query(sql, [req.body.user], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/getposts', (req, res) => {
    const sql = 'select * from noticeboard order by number desc limit ?, ?'
    mysql.query(sql, [parseInt(req.body.flag), parseInt(req.body.value)], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/getuserposts', (req, res) => {
    const sql = 'select * from noticeboard where user_id = ? order by number desc limit ?, ?'
    mysql.query(sql, [req.body.user, parseInt(req.body.flag), parseInt(req.body.value)], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/getpost', (req, res) => {
    console.log("!!")
    const sql = 'select * from noticeboard where number = ?'
    mysql.query(sql, [req.body.id], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/getcomments', (req, res) => {

    const sql = 'select * from comment where number = ?'
    mysql.query(sql, [parseInt(req.body.id)], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/write', upload.single('myfile'), (req,res) => {
    const sql = "insert into noticeBoard (user_id,comment) values(?,?)";
    mysql.query(sql,[req.session.passport.user.id,req.body.comment1],(err,result)=> {
        if(err)
            console.log(err);
        if(!result.length)
            console.log('sql insert successful at /write');        
    });
    res.redirect('/map/registerCoords/' + req.body.lat +'/' +  req.body.lng)//.json(req.body);
})

router.post('/get_myself', (req, res) => {
    const sql = 'select * from user where id = ?'
    mysql.query(sql, [req.session.passport.user.id], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
        console.log(results, req.session.passport.user.id)
    })
})

router.post('/write_comment/:id', (req, res) => {
    const sql = 'INSERT INTO comment (number, user_id, comment) VALUES (?, ?, ?)'
    console.log(req)
    mysql.query(sql, [parseInt(req.params.id), req.session.passport.user.id, req.body.comment], (err, results) => {
        if(err)
            console.log(err)
        else
            res.redirect(`/page/post/${req.params.id}`)
    })
})

router.post('/get_friend', (req, res) => {
    const sql = 'select * from friend where user_id = ?'
    mysql.query(sql, [req.session.passport.user.id], (err, results) => {
        if(err)
            res.send('noData');
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.post('/add_friend', (req, res) => {
    const sql = 'INSERT INTO friend (user_id, friend_id) VALUES(?, ?)'

    console.log(req)
    mysql.query(sql, [req.session.passport.user.id, req.body.friend], (err, results) => {
        if(err)
            console.log(err)
        else if(!results.length)
            res.send('noData');
        else
            res.send(results);
    })
})

router.get('/profile', (req, res) => {
    res.sendFile('/profile_edit.html', {root : `Front/html`})
})

module.exports = router