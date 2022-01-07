module.exports = {


  friendlyName: 'Createtextcontent',


  description: 'Create text content.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/show'
    },
  },


  fn: async function (inputs) {
    // load navbar items
    let textcontents = await TextContent.find({
      author: this.req.session.userId
    }).sort('title ASC');


    return {
      message: 'Successfully created.',
      textcontents: textcontents,
    };
  }

};
