const express = require("express");
const router = express.Router();
const createusersController = require("../controllers/create-user-controller");


// router.get('/', usersController.displayUsers);
 
router.post('/',createusersController.createUser);

module.exports = router;
