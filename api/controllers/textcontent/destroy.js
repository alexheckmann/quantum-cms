module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy a text content.',


  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      responseType: 'redirect',
    },
  },


  fn: async function ({ id }) {
    sails.log.debug("Destroy textcontent: " + id)
    let textcontent = await TextContent.destroyOne({ id: id });
    if (textcontent) {
      sails.log("Destroyed textcontent: " + textcontent.id);
      return "/textcontent";
    } else {
      sails.log("Can not destroy textcontent: " + textcontent.id);
      return "/textcontent";
    };
  }
};