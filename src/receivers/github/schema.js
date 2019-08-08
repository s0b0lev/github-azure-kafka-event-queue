import _ from 'lodash';

const extract = body => ({
  id: _.get(body, 'issue.id'),
  title: _.get(body, 'issue.title'),
  description: _.get(body, 'issue.body'),
  url: _.get(body, 'issue.html_url'),
  labels: _.get(body, 'issue.labels'),
});

export default { extract };
