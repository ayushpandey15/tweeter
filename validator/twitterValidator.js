let Joi                      = require('joi');

let validator                = require('./validateField');

exports.getFavoritesTweets   = getFavoritesTweets;
exports.retriveTweet         = retriveTweet;
exports.searchTweet          = searchTweet;

function retriveTweet(req, res, next){
    let schema   = Joi.object().keys({
        access_token   : Joi.string().options({context : false}).required(),
        user_id        : Joi.number().options({context : false}).required(),
        screen_name    : Joi.string().options({context : false}).required(),
        count          : Joi.number().options({context : false}).optional()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }
}

function searchTweet(req, res, next){
    let schema       = Joi.object().keys({
        user_id              : Joi.number().options({context : false}).required(),
        access_token         : Joi.string().options({context : false}).required(),
        q                    : Joi.string().options({context : false}).required(),
        oauth_consumer_key   : Joi.string().options({context : false}).required(),
        oauth_token          : Joi.string().options({context : false}).required()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }
}

function getFavoritesTweets(req, res, next){
    let schema      = Joi.object().keys({
        access_token  : Joi.string().options({context : false}).required(),
        user_id       : Joi.number().options({context : false}).required(),
        screen_name   : Joi.string().options({context : false}).required(),
        count         : Joi.number().options({context : false}).required()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }
}