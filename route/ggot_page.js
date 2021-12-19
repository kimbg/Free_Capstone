const express = require('express')
const router = express.Router()
const mysql = require('../src/ggot_mysql')._mysql      //mysql

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
        console.log(results)
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

module.exports = router