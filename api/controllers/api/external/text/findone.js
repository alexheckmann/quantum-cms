module.exports = {

  friendlyName: 'Find one entry via external API',

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
      select: ['title', 'content']
    });
  }
};
