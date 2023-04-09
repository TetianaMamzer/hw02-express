const {Contact, addShema, favoriteShema} = require('../models/contacts');
const { HttpError } = require("../helpers");


const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

const getContactById = async (req, res, next) => {
  try { 
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
}

const postContacts = async (req, res, next) => {
  try {
    const {error} = addShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Missing required name field")
    }
    const body = req.body;
    const result = await Contact.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json({message: "contact deleted"});
    }
  } catch (error) {
    next(error);
  }
}

const putContacts =  async (req, res, next) => {
  try {
    const {error} = addShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Missing required name field")
    }
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const {error} = favoriteShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Missing field favorite")
    }
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  postContacts,
  deleteContacts,
  putContacts,
  updateStatusContact,
}