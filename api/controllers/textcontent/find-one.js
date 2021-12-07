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
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/show'
    },
    notFound: {
      description: 'No text content with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ id }) {

    let textcontent = await TextContent.findOne({ id: id });
    if (!textcontent) { throw 'notFound'; }
    return {
      message: "",
      textcontent: textcontent
    };
  }
};