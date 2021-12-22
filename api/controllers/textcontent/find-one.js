module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {
    id: {
      description: 'The text content of the user to look up.',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
    },
    notFound: {
      description: 'No text content with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ id }) {
    // TODO select only fullName of author
    let textcontent = await TextContent.findOne({ where: {id: id}, select: ['title', 'content']}).populate('author');
    // TODO change textcontent.content to Value not found when an error occurs instead of throwing error?
    if (!textcontent) { throw 'notFound'; }
    return {
      message: '',
      textcontent: textcontent
    };
  }
};
