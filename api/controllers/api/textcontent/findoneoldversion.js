module.exports = {

  friendlyName: 'Find',

  description: 'Find archived text content.',

  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
  },

  exits: {},

  fn: async function ({id}) {
    let oldVersion = await TextContentArchive.findOne({
      where: {id: id},
      select: ['title', 'content']
    });

    return oldVersion;
  }
};
