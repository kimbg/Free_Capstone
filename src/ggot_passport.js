const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const KakaoStrategy = require('passport-kakao').Strategy
const mysql = require('./ggot_mysql')._mysql
require('dotenv').config()

const add_user = (id, password, name) => {
    mysql.getConnection((err,conn) => {
        let sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        conn.query(sql , [id, password], (err, user) => {
            if (err) {
                conn.release()
                return err
            }
            else if(!user.length){
                sql = 'INSERT INTO user (id, password, name) VALUES (?, ?, ?)'
                conn.query(sql, [id, password, name],(err,result)=> {
                    conn.release()
                    if(err)
                        return err
                    else 
                        return null
                })
            }
            else {
                conn.release()
                return null
            }
        })
    })
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    },
    (username, password, done) => {
        const sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        mysql.query(sql, [username, password], (err, results) => {
            if (err) 
                return done(err)
            else if(!results.length)
                return done(null, false, { message: 'Incorrect' })
            else
                return done(null, results[0])
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleAuth_ClientID,
    clientSecret: process.env.GoogleAuth_SecretKey,
    callbackURL: process.env.GoogleAuth_callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.displayName,
            pw: profile.id,
            name : profile._json.name
        }

        const result = add_user(user.id, user.pw, user.name)

        if(result == null) 
            return done(null, user)
        else 
            return done(result)
    }
))

passport.use('kakao-login',new KakaoStrategy({        
        clientID : process.env.KakaoAuth_ClientID,
        callbackURL : process.env.KakaoAuth_callbackURL
    },
    async(accessToken,refreshToken,profile,done)=> {
        const user = {
            id : profile.displayName,
            pw : profile.id,
            name : profile.username
        }

        const result = add_user(user.id, user.pw, user.name)

        if(result == null)
            return done(null, user)
        else
            return done(result)
    }
))

module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session()) // 세션을 알아서 잡는다?

    return passport
}
