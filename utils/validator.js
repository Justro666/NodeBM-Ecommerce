const jwt = require("jsonwebtoken");
const Helper = require("../utils/helper")

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            let result = schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.deatils[0].message));
            } else {
                next();
            }
        }
    },

    validateParams: (schema, params) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${params}`] = req.params[`${params}`];
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.deatils[0].message));
            } else {
                next();
            }
        }
    },
    validateToken: () => {
        return async (req, res, next) => {
            let token = req.headers.authorization;
            if (token) {
                token = token.split(" ")[1];
                let decoded = jwt.decode(token, process.env.SECRET_KEY);
                if (decoded) {
                    try {
                        let user = await Helper.get(decoded._id);
                        if (user) {
                            req.user = user;
                            next()
                        } else {
                            next(new Error(" Tokenization Error"))
                        }
                    } catch (error) {
                        next(new Error("Tokenization Error"))
                    }
                } else {
                    next(new Error(" Tokenization Error"))
                }
            } else {
                next(new Error(" Tokenization Error"))
            }
        }
    },
    validateRole: (role) => {
        return async (req, res, next) => {
            let verify = req.user.roles.find(ro => ro.name == role);
            if (verify) {
                next();
            } else {
                next(new Error(" You dont have permission"))
            }
        }
    },
    validateHasRoles: (role) => {
        return async (req, res, next) => {
            let bol = false;
            for (let i = 0; i < role.length; i++) {
                let hasRole = req.user.roles.find(ro => ro.name === role[i]);
                if (hasRole) {
                    bol = true;
                    break;
                }
            }
            if (bol) next();
            else next(new Error("You dont have sufficient Permission"))
        }
    }
}