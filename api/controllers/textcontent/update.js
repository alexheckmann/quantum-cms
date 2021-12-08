module.exports = {


    friendlyName: 'Update',


    description: 'Update text content.',


    inputs: {
      id: {
        description: 'The id of the text content.',
        type: 'number',
        required: true
      },
      title: {
        description: 'The description of the content.',
        type: 'string',
        required: true
      },
      content: {
        description: 'The text content.',
        type: 'string',
        required: true
      },
    },


    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'pages/textcontent/'
      },
    },


    fn: async function (inputs) {
      sails.log.debug("Update text content.")
      sails.log(inputs);
      let textcontent = await TextContent.updateOne({id: inputs.id}).set(inputs);
      sails.log.debug("Updated textcontent....")
      sails.log.debug(textcontent)
      if (!textcontent) { throw 'notFound'; }
      return {
        message: "Successfully created.",
        textcontent: textcontent
      };
    }


  };
