module.exports = {

  friendlyName: 'Find',

  description: 'Find text content.',

  inputs: {
    q: {
      description: 'The search input.',
      type: 'string',
      required: false
    },
    group: {
      description: 'The group the content belongs to.',
      type: 'number',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs) {
    let textcontents;
    if (inputs.q && inputs.q.length > 0) {
      textcontents = await TextContent.find({
        where: {
          title: {
            'contains': inputs.q
          },
          group: inputs.group
        },
        select: ['title']
      }).sort('title ASC');
    } else {
      textcontents = await TextContent.find({
        where: {group: inputs.group},
        select: ['title']
      }).sort('title ASC');
    }
    return textcontents;
  }
};
