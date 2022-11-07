const Joi = require("joi");

module.exports = {
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required()
        }),
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    RoleSchema: {
        add: Joi.object({
            name: Joi.string().required(),
        }),
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),
        addPermit: Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    UserSchmea: {
        register: Joi.object({
            name: Joi.string().min(6).max(25).required(),
            phone: Joi.string().min(8).max(11).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(25).required(),
        }),
        login: Joi.object({
            phone: Joi.string().min(8).max(11).required(),
            password: Joi.string().min(6).max(25).required(),
        }),
        addRole: Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),
        addPermit: Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
}