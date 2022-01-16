module.exports = {


  friendlyName: 'Remove tag',


  description: 'Remove a tag from a text content.',


  inputs: {
    id: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    },
    tagId: {
      description: 'The id of the tag.',
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function ({ id, tagId }) {
    let tagRemovel = await TextContent.removeFromCollection(id, 'tags')
      .members(tagId);
  }
};
