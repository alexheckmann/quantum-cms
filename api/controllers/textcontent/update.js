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
      maxLength: 80,
      required: true
    },
    content: {
      description: 'The text content.',
      type: 'string',
      maxLength: 1024
    },
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/show'
    },
  },


  fn: async function (inputs) {
    // fetch the TextContent for archiving from the DB
    let oldTextContent = await TextContent.findOne({ id: inputs.id });
    if (!oldTextContent) {
      throw 'notFound TextContent: ' + inputs.id;
    } else {
      // write TextContent to archive
      let textcontentarchive = {
        title: oldTextContent.title,
        content: oldTextContent.content,
        newestVersion: oldTextContent.id,
      };
      textcontentarchive = await TextContentArchive.create(textcontentarchive).fetch();
      sails.log.debug('Archive textcontent:');
      sails.log.debug(textcontentarchive);
    }

    // update TextContent
    let textcontent = {
      title: inputs.title,
      content: inputs.content,
      updatedFrom: this.req.session.userId,
      endpoint: 'https://qntm-cms.herokuapp.com/textcontent/' + inputs.id + '/' + inputs.title
    };
    textcontent = await TextContent.updateOne({ id: inputs.id }).set(textcontent);
    sails.log.debug('Updated textcontent:');
    sails.log.debug(textcontent);

    if (!textcontent) { throw 'notFound TextContent with ID: ' + textcontent.id; }
    return {
      message: 'Successfully created.',
      textcontent: textcontent
    };
  }

};
