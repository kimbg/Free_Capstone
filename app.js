const express  = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static('Front/'));


app.get('/', (req,res) => {
    res.status(200).sendFile(__dirname + '/Front/html/login.html');
})

app.post('/login',(req,res) => {
    res.status(200).sendFile(__dirname + '/Front/html/mainTest.html');
})

app.listen(port, (err,data) => {
    console.log(`The Server is listening on ${port}`);
});

