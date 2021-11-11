const router = require('express').Router();
const {
  getCards, createCard, deleteCard, dislikeCard, likeCard,
} = require('../controllers/card');
const {
  cardValidation,
  idCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:id', idCardValidation, deleteCard);
router.put('/:id/likes', idCardValidation, likeCard);
router.delete('/:id/likes', idCardValidation, dislikeCard);

module.exports = router;
