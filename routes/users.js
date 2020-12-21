// imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.post("/", ctrl.users.create);
router.get("/:id", ctrl.users.show);
router.put("/:id", ctrl.users.update);
router.delete("/:id", ctrl.users.destroy);

// exports
module.exports = router;
