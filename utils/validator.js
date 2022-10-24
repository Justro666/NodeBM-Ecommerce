module.exports = {
    validateBody : (schema) => {
        return(req,res,next) =>{
            let result = schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.deatils[0].message));
            } else {
                next();
            }
        }
    },

    validateParams : (schema,params) => {
        return(req,res,next) =>{
            let obj = {};
            obj[`${params}`] = req.params[`${params}`];
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.deatils[0].message));
            } else {
                next();
            }
        }
    }
}