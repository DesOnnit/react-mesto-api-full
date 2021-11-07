const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { userValidation, loginValidation } = require('./middlewares/validation');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);
app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(auth, router);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
