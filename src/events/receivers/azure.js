import schemas from './schemas/azure';
import kafka from '../senders';
import logger from '../../common/logger';

const azureEventReciever = (req, res) => {
  const messageBody = schemas.extract(req.body);

  const message = {
    originator: 'azure',
    data: messageBody,
  };

  logger.info(`[Azure Event] id: ${messageBody.id} title: ${messageBody.title}`);
  kafka(message);
  res.send('ok');
};

export default azureEventReciever;
