
let dbHandler         = require('../connection/mysql');

exports.getUser       = getUser;
exports.registerUser  = registerUser;

function getUser(opts,columns){
    return new Promise((resolve,reject)=>{
        let col = columns || `*`;
        let sql = `SELECT ${col} FROM tb_users WHERE 1=1 `
        let params=[];
        if(opts.email){
            sql+=" AND email=?"
            params.push(opts.email);
        }
        if(opts.password){
            slq+=" AND password =?"
            params.push(password);
        }
        if(opts.user_id){
            sql+=" AND user_id=?"
            params.push(opts.user_id);
        }
        if(opts.username){
            sql+=" AND username =?"
            params.push(opts.username);
        }
        if(opts.access_token){
            sql+=" AND access_token=?";
            params.push(opts.access_token);
        }

        dbHandler.mysqlPromisify(sql,params).then((result)=>{
            return resolve(result);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

function registerUser(opts){
    return new Promise((resolve,reject)=>{
        let sql ="INSERT INTO tb_users(first_name,last_name,access_token,phone_no,address,username,password,email)"+
        " VALUES(?,?,?,?,?,?,?,?)"
        dbHandler.mysqlPromisify(sql,opts.values).then((result)=>{
            return resolve(result);
        }).catch((error)=>{
            return reject(error);
        });
    });
}