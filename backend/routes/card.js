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
router.delete('/:cardId', idCardValidation, deleteCard);
router.put('/likes/:cardId', idCardValidation, likeCard);
router.delete('/likes/:cardId', idCardValidation, dislikeCard);

module.exports = router;
