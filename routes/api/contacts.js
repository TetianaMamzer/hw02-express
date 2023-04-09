const express = require("express");
const router = express.Router();

 const  {
  getAllContacts,
  getContactById,
  postContacts,
  deleteContacts,
  putContacts,
  updateStatusContact

} = require("../../controllers/contacts")


router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.post("/", postContacts);

router.delete("/:id", deleteContacts);

router.put("/:id", putContacts);

router.patch("/:id/favorite", updateStatusContact);

module.exports = router;
