// imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.post("/", ctrl.users.authenticate);
router.get("/", ctrl.users.show);
router.delete("/", ctrl.users.destroy);

// exports
module.exports = router;
