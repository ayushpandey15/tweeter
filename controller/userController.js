let Promise          = require('bluebird');
let _                = require('underscore');
let md5              = require('MD5');

let userService      = require('../services/userService');
let constants        = require('../routes/constants');

exports.userSignup   = userSignup;
exports.userLogin    = userLogin;

function userSignup(req,res){
    let first_name = req.body.first_name;
    let last_name  = req.body.last_name;
    let phone_no   = req.body.phone_no;
    let username   = req.body.username;
    let password   = req.body.password;
    let address    = req.body.address;
    let email      = req.body.email;
    let opts={}

    Promise.coroutine(function*(){
        opts ={
            email    : email,
            password : password
        };        
        let userDetail  = yield userService.getUser(opts);
        
        if(!_.isEmpty(userDetail)){
            return ({
                message : 'USER_ALREADY_EXIST',
                status  : constants.status.USER_ALREADY_EXIST,
                data    : []
            });
        }
        let access_token  = md5(first_name + last_name + new Date().valueOf());
        opts.values = [first_name,last_name,access_token,phone_no,address,username,password,email];

        yield userService.registerUser(opts);

        return ({
            message  : "REGISTER_SUCCESSFULLY",
            status   : constants.status.ACTION_COMPLETE,
            data     : []
        });
    })().then((result)=>{
        return res.status(200).send({message:result.message,status:result.status,data:result.data});
    },(error)=>{
        return res.status(200).send({message:"some_error_ocuured",status:400,data:error});
    });
}

function userLogin(req,res){
    let username    = req.body.username;
    let password    = req.body.password;
    let opts= {};

    Promise.coroutine(function*(){
        opts ={
            username : username,
            password : password
        };

        let userDetail = yield userService.getUser(opts);
        if(_.isEmpty(userDetail)){
            return ({
                message : 'invalid username or password',
                status  : constants.status.SHOW_ERROR_MESSAGE,
                data    : []
            });
        }
        return ({
            message  : 'Login Successfully',
            status   : constants.status.ACTION_COMPLETE,
            data     : userDetail[0]
        })
    })().then((result)=>{
        return res.status(200).send({message:result.message,status:result.status,data:result.data});
    },(error)=>{
        return res.status(200).send({message:"some_error_ocuured",status:400,data:error});
    });
}