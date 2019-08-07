import logger from '../../common/logger';
import schemas from './schemas/github';
import kafka from '../senders';


const githubEventReciever = (req, res) => {
  const messageBody = schemas.extract(req.body);

  const message = {
    originator: 'github',
    data: messageBody,
  };

  logger.info(`[Github Event] id: ${messageBody.id} title: ${messageBody.title}`);

  kafka(message);
  res.send('ok');
};

export default githubEventReciever;
