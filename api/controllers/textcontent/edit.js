module.exports = {


  friendlyName: 'Edit',


  description: 'Edit a given text entry',


  inputs: {
    id: {
      description: 'The text content of the user to look up.',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/edit'
    },
    notFound: {
      description: 'No text content with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({id}) {
    // load navbar items
    let textcontents = await TextContent.find({
      where: {author: this.req.session.userId},
      select: ['title']
    }).sort('title ASC');
    if (!textcontents) {
      throw 'notFound';
    }

    // load individual record
    let textcontent = await TextContent.findOne({ id: id }).populate('author').populate('updatedFrom').populate('tags').populate('oldversions');
    if (!textcontent) { throw 'notFound'; }
    return {
      textcontents: textcontents,
      textcontent: textcontent
    };
  }
};


