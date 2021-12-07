const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

exports.register = (req,res) => {
    const { firstname, lastname, username, email, password } = req.body;
    con.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], (err,result) => {
        if(err) throw err;

        if(result.length > 0){
            if(result[0].email === email){
                res.redirect("/login#emailExists");
            }
            else if(result[0].username === username){
                res.redirect("/login#usernameExists");
            }
        }
        else{
            con.query("INSERT INTO users SET ?", { first_name: firstname, last_name: lastname, email: email, username: username, password: password }, (err, result) => {
                if(err) throw err;
                res.redirect("/login#accountCreated");
            });
        }
    });
}

exports.login = (req, res) => {
    const { loginEmail, loginPass } = req.body;
    con.query("SELECT * FROM users WHERE email = ? OR username = ?", [loginEmail, loginEmail], (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.redirect("/login#notFound");
        }
        else if(result[0].password !== loginPass){
            res.redirect("/login#incorrectPass");
        }
        else{
            let myResult = result[0];
            req.session.isAuth = true;
            con.query("UPDATE users SET session_id = ? WHERE user_ID = ?",[req.session.id, myResult.user_ID], (err,result) => {
                if(err) throw err;
                con.query("SELECT * FROM users WHERE user_ID = ?", myResult.user_ID, (err, result) => {
                    if(err) throw err;
                    res.redirect(`/?user=${result[0].session_id}`);
                });
            });
        }
    });
}