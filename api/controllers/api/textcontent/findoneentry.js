module.exports = {

  friendlyName: 'Find one entry',

  description: 'Find a specific text content.',

  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
  },

  exits: {},

  fn: async function ({id}) {
    return await TextContent.findOne({
      where: {id: id},
    }).populate('author').populate('updatedFrom');
  }
};
