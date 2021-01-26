# Проект Mesto бэкенд

## Технологии

* Node.js
* Express.js
* Postman
* MongoDB

## Локальная установка

1. git clone https://github.com/ps-fedorova/news-explorer-api-full.git
2. cd news-explorer-api-full
3. npm i

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

Локальный сервер доступен по адресу http://localhost:3000.

## Роуты

`POST /signup` — роут для регистрации   
`POST /signin` — роут для логина

`GET /users` — возвращает всех пользователей   
`GET /users/:userId` - возвращает пользователя по _id   
`POST /users` — создаёт пользователя   
`PATCH /users/me` — обновляет профиль   
`PATCH /users/me/avatar` — обновляет аватар

`GET /cards` — возвращает все карточки   
`POST /cards` — создаёт карточку   
`DELETE /cards/:cardId` — удаляет карточку по идентификатору   
`PUT /cards/:cardId/likes` — поставить лайк карточке   
`DELETE /cards/:cardId/likes` — убрать лайк с карточки

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
