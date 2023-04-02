const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const router = express.Router();

const { HttpError } = require("../../helpers");

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`
  }),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
});



router.post("/", async (req, res, next) => {
  try {
    const {error} = addShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Missing required name field")
    }
    const body = req.body;
    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json({message: "contact deleted"});
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {error} = addShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Missing required name field")
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
