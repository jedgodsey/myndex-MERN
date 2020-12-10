// imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
// router.get("/:id", ctrl.users.show);
router.post("/verify", ctrl.users.verify);
// router.put("/:id", ctrl.users.update);
// router.delete("/:id", ctrl.users.destroy);

// exports
module.exports = router;
