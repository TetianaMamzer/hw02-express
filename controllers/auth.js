const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../secret");


const {registerShema, User} = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcryptjs");

const register = async(req, res, next) => {
  try {
    const {error} = registerShema.validate(req.body);
    const {email, password} = req.body;
    if(error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації")
    }

    const user = await User.findOne({email});
    if(user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    })
  } catch (error) {
    next(error);
  }
}

const login = async(req, res, next) => {
  try {
    const {error} = registerShema.validate(req.body);
    const {email, password} = req.body;
    if(error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації")
    }

    const user = await User.findOne({email});
    if(!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});

    await User.findByIdAndUpdate(user._id, {token});

    res.json({
      token,
      user
    })
  } catch (error) {
    next(error);
  }
}

const getCurrent = async(req, res, next) => {
  try {
    const {error} = registerShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації")
    }
    const {email, subscription} = req.user;

    res.json({
      email,
      subscription
    })
  } catch (error) {
    next(error);
  }

}

const logout = async(req, res, next) => {
  try {
    const {error} = registerShema.validate(req.body);
    if(error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації")
    }
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
      message: "Logout success"
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrent,
  register, 
  login,
  logout
}