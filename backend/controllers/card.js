const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      } else { next(err); }
    });
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFound('Такой карточки не существует');
      }
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(req.params.id)
          .then((cardData) => res.send(cardData));
      } else {
        throw new Forbidden('Недостаточно прав!');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFound('Такого пользователя не существует');
      }
      res.status(200).send({ data: like });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFound('Такого пользователя не существует');
      }
      res.status(201).send({ data: like });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
