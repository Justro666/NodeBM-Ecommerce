const router = require("express").Router();
const controller = require ("../controller/role");
const {validateBody,validateParams} = require("../utils/validator");
const {RoleSchema} = require("../utils/schema");

router.get("/",controller.all);
router.post("/",validateBody(RoleSchema.add),controller.add);
router.post("/add/permit",validateBody(RoleSchema.addPermit),controller.addPermit);
router.post("/remove/permit",validateBody(RoleSchema.addPermit),controller.removePermit)

router.route("/:id")
    .get(validateParams(RoleSchema.id,"id"),controller.get)
    .patch(validateParams(RoleSchema.id,"id"),validateBody(RoleSchema.add),controller.patch)
    .delete(validateParams(RoleSchema.id,"id"),controller.drop)

module.exports = router;