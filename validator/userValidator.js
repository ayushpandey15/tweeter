let Joi             = require('joi');

let validator       = require('./validateField');

exports.userSignup  = userSignup;
exports.userLogin   = userLogin;

function userSignup(req, res, next){
    let schema  = Joi.object().keys({
        first_name   : Joi.string().options({convert : false}).require(),
        last_name    : Joi.string().options({convert : false}).require(),
        username     : Joi.string().options({convert : false}).require(),
        address      : Joi.string().options({convert : false}).require(),
        phone_no     : Joi.string().options({convert : false}).require(),
        password     : Joi.string().options({convert : false}).require(),
        email        : Joi.string().options({convert : false}).require()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }
}

function userLogin(req, res, next){
    let schema = Joi.object().keys({
        username      : Joi.string().options({convert : false}).require(),
        password      : Joi.string().options({convert : false}).require()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }
}