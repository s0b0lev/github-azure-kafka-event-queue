import kafka from '../common/kafka';
import logger from '../common/logger';


const extract = ({ issue, action }) => ({
  id: issue.id,
  title: issue.title,
  description: issue.body,
  url: issue.html_url,
  labels: issue.labels,
  action,
});

export default (req, res) => {
  const messageBody = extract(req.body);
  logger.info(`[Github Event] id: ${messageBody.id} title: ${messageBody.title}`);

  kafka({ originator: 'github', data: messageBody });
  res.json({ status: 'ok' });
};
