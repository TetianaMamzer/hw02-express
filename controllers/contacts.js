const {Contact, addShema, favoriteShema} = require('../models/contacts');
const { HttpError } = require("../helpers");


const getAllContacts = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, favorite} = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({owner}, "-createdAt, -updatedAt", {skip, limit}).populate("owner", "email");

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
    const {_id: owner} = req.user;
    const result = await Contact.create({...body, owner});
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