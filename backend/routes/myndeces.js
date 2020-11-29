// imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.myndeces.display);
router.get("/:id", ctrl.myndeces.show);
router.post("/", ctrl.myndeces.create);
// router.put("/:id", ctrl.myndeces.update);
router.delete("/:id", ctrl.myndeces.destroy);

// exports
module.exports = router;
