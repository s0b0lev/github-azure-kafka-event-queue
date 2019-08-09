import express from 'express';
import http from 'http';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import _ from 'lodash';
import config from '../config';
import logger from './common/logger';

import github from './receivers/github';
import azure from './receivers/azure';

import verifyGithubToken from './common/verifyGithubToken';
import verifyAzureBasicAuth from './common/verifyAzureBasicAuth';


const app = express();

app.set('port', config.PORT);
app.use(express.json());

app.post('/api/events/github', verifyGithubToken, github);
app.post('/api/events/azure', verifyAzureBasicAuth, azure);

app.use((err, req, res, next) => {
  _.noop(next);
  const status = err.statusCode || INTERNAL_SERVER_ERROR;

  logger.info(err, `${status} ${req.method} ${req.url}`);

  res.status(status);
  res.json(status);
});

const httpServer = http.createServer(app);
httpServer.listen(app.get('port'), () => {
  logger.info(
    `Express server listening on port ${app.get('port')} in ${process.env.NODE_ENV} mode`,
  );
});

export default app;
