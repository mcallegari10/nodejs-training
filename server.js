const app = require('./app'),
  migrationsManager = require('./migrations'),
  config = require('./config'),
  logger = require('./app/logger');

const port = config.common.api.port || 8080;

Promise.resolve()
  .then(() => migrationsManager.check())
  .then(() => {
    app.listen(port);

    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
