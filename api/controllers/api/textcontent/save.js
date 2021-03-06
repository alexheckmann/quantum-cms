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
    group: {
      description: 'The group the content belongs to.',
      type: 'number',
      required: true
    }
  },


  exits: {},


  fn: async function (inputs) {
    let textcontent = {
      author: this.req.session.userId,
      status: 'active',
      title: inputs.title,
      content: inputs.content,
      group: inputs.group
    };

    textcontent = await TextContent.create(textcontent).fetch();
    textcontent = await TextContent.updateOne({id: textcontent.id}).set({
      endpoint: 'https://qntm-cms.herokuapp.com/api/external/' + textcontent.id
    });
    sails.log.debug(textcontent);
    if (!textcontent) {
      throw 'notFound';
    }
    return {
      id: textcontent.id
    };
  }

};
