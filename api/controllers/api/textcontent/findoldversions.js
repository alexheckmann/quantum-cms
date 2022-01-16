module.exports = {

  friendlyName: 'Find',

  description: 'Find text content.',

  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
  },

  exits: {},

  fn: async function ({id}) {
    let oldVersions = await TextContentArchive.find({
      where: {newestVersion: id},
      select: ['updatedAt']
    }).sort('updatedAt DESC');

    return oldVersions;
  }
};
