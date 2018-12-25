let Joi                = require('joi');

exports.validateFields = validateFields;

function validateFields( req, res, schema){    
    let validation =Joi.validate(req,schema);
    if(validation.error) {
        let errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong'; 
                res.status(200).send({status:400, message: "ERROR", data: errorReason}); 
                return false;                       
    }
    return true;
}