import _ from 'lodash';
import kafka from '../common/kafka';
import logger from '../common/logger';

const getParentId = (relations) => {
  const relation = relations.find(rel => rel.attributes.name === 'Parent');
  return relation && _.last(relation.url.split('/'));
};


const extract = ({ resource }) => ({
  id: resource.id,
  title: _.get(resource, 'fields.["System.Title"]'),
  description: _.get(resource, 'fields.["System.Description"]'),
  acceptanceCriteria: _.get(resource, 'fields.["Microsoft.VSTS.Common.AcceptanceCriteria"]'),
  url: _.get(resource, 'fields.html.href'),
  type: _.get(resource, 'fields.["System.WorkItemType"]'),
  parentId: resource.relations && getParentId(resource.relations),
});

const extractComment = ({ resource }) => ({
  id: resource.id,
  workitemId: resource.id,
  title: _.get(resource, 'fields.["System.Title"]'),
  comment: _.get(resource, 'fields.["System.History"]'),
  url: _.get(resource, '_links.html.href'),
  parentId: resource.relations && getParentId(resource.relations),
});


const supportedEventTypes = [
  'workitem.updated',
  'workitem.created',
  'workitem.deleted',
  'workitem.restored',
  'workitem.updated',
];

export default (req, res) => {
  const { eventType } = req.body;
  let data = {};

  if (eventType === 'workitem.commented') {
    data = extractComment(req.body);
  } else if (supportedEventTypes.includes(eventType)) {
    data = extract(req.body);
  }

  logger.info(`[Azure Event] id: ${data.id} title: ${data.title}`);

  kafka({ originator: 'azure', data });
  res.send('ok');
};
