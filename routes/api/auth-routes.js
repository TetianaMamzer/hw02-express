const express =  require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const {register, login, getCurrent, logout, updateAvatar, verify, resendVerify} = require('../../controllers/auth')

router.post('/register', register);

router.get("/verify/:verificationToken", verify);

router.post("/verify", resendVerify)

router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;