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
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/index'
    }
  },

  fn: async function (inputs) {
    let textcontents;
    if (inputs.q && inputs.q.length > 0) {
      textcontents = await TextContent.find({
        title: {
          'contains': inputs.q
        },
        author: this.req.session.userId
      }).sort('title ASC');
    } else {
      textcontents = await TextContent.find({
        author: this.req.session.userId
      }).sort('title ASC');
    }
    sails.log.debug(textcontents);
    return ({ textcontents: textcontents });
  }
};
