const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = new Schema({
  name: {
    type: String,
    require:  [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    require: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});


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
  favorite: Joi.boolean(),
})

const favoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
})
contactShema.post("save", (error, data, next) => {
  error.status = 400;
  next();
})

const Contact = model("contact", contactShema);

module.exports = {
  addShema,
  favoriteShema,
  Contact
}
