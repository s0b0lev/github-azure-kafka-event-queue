import kafka from '../common/kafka';
import logger from '../common/logger';

const extractComment = comment => ({
  id: comment.id,
  body: comment.body,
  user: comment.user.login,
  url: comment.url,
  created_at: comment.created_at,
});

const extractLabels = labels => labels.map(label => (
  {
    name: label.name,
    color: label.color,
  }
));


const extract = ({ issue, action, comment }) => ({
  id: issue.id,
  title: issue.title,
  description: issue.body,
  url: issue.html_url,
  labels: extractLabels(issue.labels),
  comment: comment && extractComment(comment),
  action,
});

export default (req, res) => {
  const messageBody = extract(req.body);
  logger.info(`[Github Event] id: ${messageBody.id} title: ${messageBody.title}`);

  kafka({ originator: 'github', data: messageBody });
  res.send('ok');
};
