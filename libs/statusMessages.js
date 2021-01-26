module.exports = {

  SUCCESS: {
    REMOVE_CARD: 'Пост успешно удален', // 200 OK («хорошо»)
    AUTHORIZATION: 'Авторизация прошла успешно', // 200 OK («хорошо»)
  },

  CLIENT_ERROR: {
    AUTHENTICATION: 'Неправильные почта или пароль', // 401 Unauthorized («не авторизован (не представился)»)
    AUTHORIZATION: 'Требуется авторизация', // 401 Unauthorized («не авторизован (не представился)»)
    FORBIDDEN: 'Недостаточно прав для выполнения операции', // 403 Forbidden («запрещено (не уполномочен)»)
    CARD_NOT_FOUND: 'Карточка не найдена', // 404 Not Found («не найдено»)
    USER_NOT_FOUND: 'Пользователь не найден', // 404 Not Found («не найдено»)
    RESOURCE_NOT_FOUND: 'Запрашиваемый ресурс не найден', // 404 Not Found («не найдено»)
    CONFLICT: 'Пользователь с таким email уже зарегистрирован', // 409 Conflict («конфликт»)
    TOO_MANY_REQUESTS: 'Запросы, поступившие с вашего IP-адреса, похожи на автоматические. Попробуйте повторить попытку позже', // 429 Too Many Requests («слишком много запросов»)
  },

  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка: ', // 500 Internal Server Error («внутренняя ошибка сервера»)
  },

};
