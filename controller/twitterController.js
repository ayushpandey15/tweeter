let Promise                  = require('bluebird');
let _                        = require('underscore');
const request                = require('request');

let constanst                = require('../routes/constants');
let userServices             = require('../services/userService');

exports.retrivePost          = retrivePost;
exports.searchTweet          = searchTweet;
exports.getFavoritesTweets   = getFavoritesTweets;

function retrivePost(req,res){
    let access_token    = req.body.access_token;
    let user_id         = req.body.user_id;
    let screen_name     = req.body.screen_name;
    let count           = req.body.count || 200;
    let opts={};

    Promise.coroutine(function*(){
        opts={
            user_id      : user_id,
            access_token : access_token
        };

        let userDetails  = yield userServices.getUser(opts);

        if(_.isEmpty(userDetails)){
            return ({
                message : "INVALID USER",
                status  : constanst.status.SHOW_ERROR_MESSAGE,
                data    : []
            });
        }
        let option = {
            method : 'GET',
            url    : constanst.twitter.url_get,
            qs     : {
                screen_name : screen_name,
                count       : count
            },
            headers : {
                'content-type': 'application/json'
            },
            json : true
        };
        request(option,function(err,response,body){
            if(err || !body){
                console.log("request error",err);
            }
            let insertObj ={
                user_id     : user_id,
                error       :err,
                screen_name : screen_name,
                response    : body,
            }
            db.collection('tb_retrive_tweet').insertOne(insertObj,(error,resilt)=>{
                if(error){
                    console.log("mongo error",error);
                }
            });
            return ({
                message : 'ACTION COMPLETE',
                status  : constanst.status.ACTION_COMPLETE,
                data    : body
            });
        });
    })().then((result)=>{
        return res.status(200).send({message:result.message,status:result.status,data:result.data});
    },(error)=>{
        return res.status(200).send({message:"some_error_ocuured",status:400,data:error});
    })
}

function searchTweet(req, res){
    let user_id             = req.body.user_id;
    let access_token        = req.body.access_token;
    let q                   = req.body.q;
    let oauth_consumer_key  = req.body.oauth_consumer_key;
    let oauth_token         = req.body.oauth_token;

    Promise.coroutine(function*(){
        let opts = {
            user_id      : user_id,
            access_token : access_token
        };

        let userDetails  = yield userServices.getUser(opts);

        if(_.isEmpty(userDetails)){
            return ({
                message : "INVALID USER",
                status  : constanst.status.SHOW_ERROR_MESSAGE,
                data    : []
            });
        }
        
        let options ={
            method : 'GET',
            url    : constanst.twitter.search_tweet,
            qs : {
                q           : q,
                result_type : 'popular'
            },
            headers : {
                'content-type'  : 'application/json',
                'authorization' : 'OAuth oauth_consumer_key='+ oauth_consumer_key+','+'oauth_token='+oauth_token+',oauth_version="1.0"'
            },
            json : true
        };
        request(options,function(err,response,body){
            if(err || !body){
                console.log("request error",err);
                return ({
                    message : 'some error occured',
                    status  : constanst.status.SHOW_ERROR_MESSAGE,
                    data    :err
                });
            }
            let insertObj ={
                user_id     : user_id,
                error       :err,
                search      : q,
                response    : body,
            }
            db.collection('tb_search_tweet').insertOne(insertObj,(error,resilt)=>{
                if(error){
                    console.log("mongo error",error);
                }
            });
            return ({
                message : 'ACTION COMPLETE',
                status  : constanst.status.ACTION_COMPLETE,
                data    : body
            });
        })
    })().then((result)=>{
        return res.status(200).send({message:result.message,status:result.status,data:result.data});
    },(error)=>{
        return res.status(200).send({message:"some_error_ocuured",status:400,data:error});
    })
}

function getFavoritesTweets(req,res){
    let access_token    = req.body.access_token;
    let user_id         = req.body.user_id;
    let screen_name     = req.body.screen_name;
    let count           = req.body.count || 200;
    let opts={}; 

    Promise.coroutine(function*(){
        opts={
            user_id      : user_id,
            access_token : access_token
        };

        let userDetails  = yield userServices.getUser(opts);

        if(_.isEmpty(userDetails)){
            return ({
                message : "INVALID USER",
                status  : constanst.status.SHOW_ERROR_MESSAGE,
                data    : []
            });
        }
        
        let options = {
            method : "GET",
            url    : constanst.twitter.favorite_tweet,
            qs     : {
                screen_name : screen_name,
                count       : count
            },
            headers  : {
                'content-type' : "application/json"
            },
            json : true
        }

        request(options,function(err,response,body){
            if(err || !body){
                console.log("request error",err);
                return ({
                    message : 'some error occured',
                    status  : constanst.status.SHOW_ERROR_MESSAGE,
                    data    :err
                });
            }
            let insertObj ={
                user_id     : user_id,
                error       :err,
                search      : q,
                response    : body,
            }
            db.collection('tb_favrourite_tweet').insertOne(insertObj,(error,resilt)=>{
                if(error){
                    console.log("mongo error",error);
                }
            });
            return ({
                message : 'ACTION COMPLETE',
                status  : constanst.status.ACTION_COMPLETE,
                data    : body
            });
        });
    })().then((result)=>{
        return res.status(200).send({message:result.message,status:result.status,data:result.data});
    },(error)=>{
        return res.status(200).send({message:"some_error_ocuured",status:400,data:error});
    });
}