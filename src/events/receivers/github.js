import logger from '../../common/logger';

const githubEventReciever = (req, res) => {
  const { issue, body, labels } = req.body;

  const parsedIssue = {
    id: issue.id,
    url: issue.html_url,
    title: issue.title,
    body,
    labels,
  };

  logger.info(`[Github Event] id: ${parsedIssue.id} title: ${parsedIssue.title}`);

  res.send('ok');
};

export default githubEventReciever;
