const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Auth = require('../errors/Auth');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      } else { next(err); }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name, about: user.about, avatar: user.avatar, email: user.email,
        },
      });
    })
    .catch((err) => {
      if ( err.code === 11000) {
        throw new Conflict('Пользователь с таким email уже существует');
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const userdId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userdId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует');
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      } else { next(err); }
    });
};

const updateAvatar = (req, res, next) => {
  const userdId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userdId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Такого пользователя не существует');
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      } else { next(err); }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({ token });
    })
    .catch(() => {
      throw new Auth('Неправильный email или пароль');
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
