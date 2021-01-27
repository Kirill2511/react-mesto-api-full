require('dotenv').config();

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/404_NotFoundError');

const { auth } = require('./middlewares/auth');
const { limit } = require('./middlewares/expressRateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateRegister, validateLogin } = require('./middlewares/celebrateValidation/celebrateValidation');

const { SERVER_ERROR, CLIENT_ERROR } = require('./libs/statusMessages');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { login, createUser } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => { console.log('База данных подключена'); })
  .catch((err) => { console.log(`Ошибка при подключении базы данных: ${err}`); });

app.use(requestLogger);

app.use(cors());
app.use(helmet());
app.use(limit);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(() => {
  throw new NotFoundError({ message: CLIENT_ERROR.RESOURCE_NOT_FOUND });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `${SERVER_ERROR.INTERNAL_SERVER_ERROR}: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
