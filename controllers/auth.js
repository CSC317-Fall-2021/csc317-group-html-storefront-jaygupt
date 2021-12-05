const mysql = require("mysql2");
const path = require("path");

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
                res.redirect("/login.html#emailExists");
            }
            else if(result[0].username === username){
                res.redirect("/login.html#usernameExists");
            }
        }
        else{
            con.query("INSERT INTO users SET ?", { first_name: firstname, last_name: lastname, email: email, username: username, password: password }, (err, result) => {
                if(err) throw err;
                res.redirect("/login.html#accountCreated");
            });
        }
    });
}

exports.login = (req, res) => {
    const { loginEmail, loginPass } = req.body;
    con.query("SELECT * FROM users WHERE email = ? OR username = ?", [loginEmail, loginEmail], (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.redirect("/login.html#notFound");
        }
        else if(result[0].password !== loginPass){
            res.redirect("/login.html#incorrectPass");
        }
        else{
            res.redirect("/login.html#loggedIn");
        }
    });
}