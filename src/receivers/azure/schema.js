import _ from 'lodash';


const getParentId = (relations) => {
  if (!relations) {
    return null;
  }

  const relation = relations.find(rel => rel.attributes.name === 'Parent');
  return _.last(relation.url.split('/'));
};


const extract = (body) => {
  const { resource: { fields, relations }, id } = body;


  return {
    id,
    title: _.get(fields, '["System.Title"]'),
    description: _.get(fields, '["System.Description"]'),
    acceptanceCriteria: _.get(fields, '["Microsoft.VSTS.Common.AcceptanceCriteria"]'),
    url: _.get(body, 'resource._links.html.href'),
    type: _.get(fields, '["System.WorkItemType"]'),
    parentId: getParentId(relations),
  };
};

export default { extract };