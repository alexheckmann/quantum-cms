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

  },


  fn: async function ({ id }) {
    let textcontent = await TextContent.destroyOne({ id: id });
  }
};
