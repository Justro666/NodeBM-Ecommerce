const Joi = require("joi");

module.exports = {
    PermitSchema : {
        add : Joi.object({
            name : Joi.string().required()
        }),
        id : Joi.object({
            id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }) 
    }
}