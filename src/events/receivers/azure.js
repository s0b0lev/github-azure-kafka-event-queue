import logger from '../../common/logger';

const azureEventReciever = (req, res) => {
  logger.info('Azure Devops Event');

  res.json({
    status: 200,
  });
};

export default azureEventReciever;
