const rateLimit = require('express-rate-limit');

module.exports.limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Запросы, поступившие с вашего IP-адреса, похожи на автоматические. Попробуйте повторить попытку позже' },
});
