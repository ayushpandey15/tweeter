let mysql              = require('mysql');

exports.connect        = connect;
exports.mysqlPromisify = mysqlPromisify;

function connect(){
    let con = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : 'twitter_dev'
    });
    global.connection = con;
    
    connection.connect(function(err){
        if(err) { throw err }
        console.log("connected to mysql database.........");
    });

    let sql = "CREATE TABLE IF NOT EXIST `tb_users` ( `user_id` INT(100) NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(50) NOT NULL , `last_name` VARCHAR(50) NOT NULL , `access_token` VARCHAR(500) NOT NULL , `phone_no` VARCHAR(20) NOT NULL , `address` VARCHAR(100) NOT NULL ,username NOT NULL VARCHAR(100) ,password NOT NULL VARCHAR(100),email NOT NULL VARCHAR(100),PRIMARY KEY (`user_id`)),UNIQUE KEY(`email`)"
    
    connection.query(sql,[],function(err,result){
        if(error){
            console.log("sql_error",error);
        }
    });
}

function mysqlPromisify(sql,params){
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,function(error,result){
            if(err){
                return reject(error);
            }
            return resolve(result);
        });
    });
}