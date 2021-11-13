const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mysql = require('./DB')._mysql;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    },
    function (username, password, done) {
        mysql.getConnection((err,conn) => {
            const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
            conn.query(sql , [username, password], (err, user) => {
                mysql.releaseConnection(conn);
                if (err) {
                    return done(err);
                }
                else if(!user.length){
                    return done(null, false, { message: 'Incorrect' });
                }
                return done(null, user[0]);
            })
        })
    }
))

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session()); // 세션을 알아서 잡는다?

    return passport;
}
