const express =  require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");

const {register, login, getCurrent, logout} = require('../../controllers/auth')

router.post('/register', register);
router.post("/login", login)

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;