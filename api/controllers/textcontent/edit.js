module.exports = {


    friendlyName: 'Edit',


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
        viewTemplatePath: 'pages/textcontent/edit'
      },
      notFound: {
        description: 'No text content with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },

    fn: async function ({id}) {

      let textcontent = await TextContent.findOne({ id: id }).populate('author').populate('updatedFrom');
      if (!textcontent) { throw 'notFound'; }
      return {
        textcontent: textcontent
      };
    }
  };
