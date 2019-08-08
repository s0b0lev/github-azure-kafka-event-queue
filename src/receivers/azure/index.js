import kafka from '../../common/kafka';
import logger from '../../common/logger';
import schemas from './schema';

export default (req, res) => {
  const messageBody = schemas.extract(req.body);
  logger.info(`[Azure Event] id: ${messageBody.id} title: ${messageBody.title}`);

  kafka({ originator: 'azure', data: messageBody });
  res.send('ok');
};
