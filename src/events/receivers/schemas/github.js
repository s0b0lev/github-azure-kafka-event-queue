import _ from 'lodash';

const extract = body => ({
  id: _.get(body, 'issue.id'),
  title: _.get(body, 'issue.title'),
  description: _.get(body, 'body'),
  url: _.get(body, 'issue.html_url'),
  type: _.get(body, 'body.body'),
});

export default { extract };
