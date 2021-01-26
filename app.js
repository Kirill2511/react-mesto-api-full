require('dotenv').config();

const express = require('express');

const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/auth');
const { limit } = require('./middlewares/expressRateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use(helmet());
app.use(limit);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
