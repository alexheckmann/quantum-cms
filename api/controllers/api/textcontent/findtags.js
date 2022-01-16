module.exports = {

  friendlyName: 'Find tags',

  description: 'Find tags for given text content.',

  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
  },

  exits: {},

  fn: async function ({id}) {
    let tags = await TextContent.find({
      where: {id: id},
      select: ['id'],
    }).populate('tags', {
      select: ['colour', 'name', 'id']
    });

    if (!tags) {
      throw 'notFound';
    }

    return tags;
  }
};
