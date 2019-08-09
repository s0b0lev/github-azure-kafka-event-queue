import _ from 'lodash';
import kafka from '../common/kafka';
import logger from '../common/logger';

const getParentId = (relations) => {
  const relation = relations.find(rel => rel.attributes.name === 'Parent');
  return relation && _.last(relation.url.split('/'));
};


const extract = ({ resource, id }) => ({
  id,
  title: _.get(resource, 'fields.["System.Title"]'),
  description: _.get(resource, 'fields.["System.Description"]'),
  acceptanceCriteria: _.get(resource, 'fields.["Microsoft.VSTS.Common.AcceptanceCriteria"]'),
  url: _.get(resource, 'fields.html.href'),
  type: _.get(resource, 'fields.["System.WorkItemType"]'),
  parentId: resource.relations && getParentId(resource.relations),
});


export default (req, res) => {
  const messageBody = extract(req.body);
  logger.info(`[Azure Event] id: ${messageBody.id} title: ${messageBody.title}`);

  kafka({ originator: 'azure', data: messageBody });
  res.send('ok');
};
