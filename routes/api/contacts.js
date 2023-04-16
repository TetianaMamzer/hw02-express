const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate")

 const  {
  getAllContacts,
  getContactById,
  postContacts,
  deleteContacts,
  putContacts,
  updateStatusContact

} = require("../../controllers/contacts")


router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, getContactById);

router.post("/", authenticate, postContacts);

router.delete("/:id", authenticate, deleteContacts);

router.put("/:id", authenticate, putContacts);

router.patch("/:id/favorite", authenticate, updateStatusContact);

module.exports = router;
