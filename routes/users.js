const express = require("express");
const router = express.Router();
const createUsersController = require("../controllers/create-user-controller");


// router.get('/', usersController.displayUsers);
 
router.post('/',createUsersController.createUser);

module.exports = router;
