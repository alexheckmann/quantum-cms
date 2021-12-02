module.exports = {


    friendlyName: 'Createtextcontent',
  
  
    description: 'Create text content.',
  
  
    inputs: {
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
        viewTemplatePath: 'pages/textcontent/show'
      },
    },
  
  
    fn: async function (inputs) {
      sails.log.debug("Create new text content.")
      let textcontent = await TextContent.create(inputs).fetch();
      sails.log.debug("New text content....")
      sails.log.debug(textcontent)
      if (!textcontent) { throw 'notFound'; }
      return {
        message: "Successfully created.",
        textcontent: textcontent
      };
    }
  
  };