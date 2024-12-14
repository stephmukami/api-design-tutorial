const express = require("express");
const router = express.Router()
const deleteUser = require("../controllers/delete-controller");

router.post('/',deleteUser);

module.exports = router;