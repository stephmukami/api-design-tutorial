const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");


router.get('/', usersController.displayUsers);
 
router.post('/',usersController.createUser);

module.exports = router;