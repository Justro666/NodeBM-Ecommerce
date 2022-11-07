const router = require("express").Router();
const controller = require("../controller/user");
const { validateBody, validateToken, validateRole } = require("../utils/validator");
const { UserSchmea } = require("../utils/schema")

router.get("/all", controller.allUsers);

router.post("/", [validateBody(UserSchmea.login), controller.login]);
router.post("/register", [validateBody(UserSchmea.register), controller.register]);

router.post("/add/role", [validateToken(), validateRole("Owner"), validateBody(UserSchmea.addRole), controller.addRole])
router.post("/remove/role", [validateToken(), validateRole("Owner"), validateBody(UserSchmea.addRole), controller.removeRole])

router.post("/add/permit", [validateToken(), validateRole("Owner"), validateBody(UserSchmea.addPermit), controller.addPermit])
router.post("/remove/permit", [validateToken(), validateRole("Owner"), validateBody(UserSchmea.addPermit), controller.removePermit])
module.exports = router;