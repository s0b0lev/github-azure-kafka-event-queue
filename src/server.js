import express from 'express';
import http from 'http';
import config from '../config';
import logger from './common/logger';

import eventsRouter from './events';

const app = express();
app.set('port', config.PORT);

app.use(express.json());

app.use('/api/events', eventsRouter);


const httpServer = http.createServer(app);

httpServer.listen(app.get('port'), () => {
  logger.info(
    `Express server listening on port ${app.get('port')} in ${process.env.NODE_ENV} mode`,
  );
});
