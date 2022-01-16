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
    let textContentArchive = await TextContentArchive.destroy({newestVersion: id});
    sails.log.debug('Deleted associated entries');
    let textcontent = await TextContent.destroyOne({ id: id });
  }
};
