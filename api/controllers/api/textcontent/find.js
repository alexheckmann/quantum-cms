module.exports = {

  friendlyName: 'Find',

  description: 'Find text content.',

  inputs: {
    q: {
      description: 'The search input.',
      type: 'string',
      required: false
    }
  },

  exits: {
  },

  fn: async function (inputs) {
    let textcontents;
    if (inputs.q && inputs.q.length > 0) {
      textcontents = await TextContent.find({
        where: {
          title: {
            'contains': inputs.q
          },
          author: this.req.session.userId
        },
        select: ['title']
      }).sort('title ASC');
    } else {
      textcontents = await TextContent.find({
        where: {author: this.req.session.userId},
        select: ['title']
      }).sort('title ASC');
    }
    return textcontents;
  }
};
