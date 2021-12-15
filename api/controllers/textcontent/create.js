module.exports = {


    friendlyName: 'Createtextcontent',


    description: 'Create text content.',


    inputs: {
      title: {
        description: 'The description of the content.',
        type: 'string',
        maxLength: 80,
        required: true
      },
      content: {
        description: 'The text content.',
        type: 'string',
        maxLength: 1024,
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
      let textcontent = {
        author: this.req.session.userId,
        status: 'active',
        endpoint: 'https://qntm-cms.herokuapp.com/textcontent/api/'+inputs.id+'/'+inputs.title,
        title: inputs.title,
        content: inputs.content
      };

      textcontent = await TextContent.create(textcontent).fetch();

      sails.log.debug(textcontent)
      if (!textcontent) { throw 'notFound'; }
      return {
        message: "Successfully created.",
        textcontent: textcontent
      };
    }

  };
