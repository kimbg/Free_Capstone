const multer = require('multer');
const mysql = require('../src/ggot_mysql')._mysql

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image');
    },
    filename: (req, file, cb) => {

        const sql = 'select * from noticeboard order by number desc limit 1'
        mysql.query(sql, (err, results) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                cb(null, "" + (results[0].number + 1) + "." + file.originalname.split('.')[1]);
            }
        })
    }
})

const upload = multer({storage : storage});

module.exports = {
    _upload : upload,
}