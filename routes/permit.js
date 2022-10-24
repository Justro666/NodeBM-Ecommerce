const router = require("express").Router();
const controller = require("../controller/permit");
const {validateBody ,validateParams} = require("../utils/validator");
const {PermitSchema} =require("../utils/schema")

router.get("/",controller.all);
router.post("/",validateBody(PermitSchema.add),controller.add);

router.route("/:id")
    .get(validateParams(PermitSchema.id,"id"),controller.get)
    .patch(validateParams(PermitSchema.id,"id"),validateBody(PermitSchema.add),controller.patch)
    .delete(validateParams(PermitSchema.id,"id"),controller.drop)



module.exports = router;