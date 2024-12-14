const express = require("express");
const router = express.Router();
const updateUser = require("../controllers/update-controller");

router.post('/',updateUser);

module.exports = router;