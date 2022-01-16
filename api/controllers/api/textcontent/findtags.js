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
    let tags = await Tag.find({
      where: {textContentTag: id},
    }).sort('name DESC');

    return tags;
  }
};
