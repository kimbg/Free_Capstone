const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination : (req,file,cb)=> {cb(null,__dirname + '/Image');},
    filename : (req,file,cb) => {
        let fname = file.originalname;
        let dotPosition = fname.length - 4;
        let frontName = fname.substr(0,dotPosition);
        let backName = fname.substr(dotPosition,fname.length);
        let i = 1;

        while(fs.existsSync(`./image/${fname}`))
        {
            fname = frontName + `(${i})` + backName;        
            i++;            
        }
        
        mysql.getConnection((err,conn)=> {
            conn.query(`insert into noticeBoard (userid,comment) values('김병관',?)`,[fname],(err,result)=> {
                conn.release();
                if(err){
                    console.log('err1');
                }                
            })
        })  
        
        cb(null,fname);
    }
})
const upload = multer({storage : storage});