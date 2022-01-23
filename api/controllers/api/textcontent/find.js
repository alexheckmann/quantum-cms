module.exports = {

  friendlyName: 'Find',

  description: 'Find text content.',

  inputs: {
    q: {
      description: 'The search input.',
      type: 'string',
      required: false
    },
    group: {
      description: 'The group the content belongs to.',
      type: 'number',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs) {
    let textcontents;
    if (inputs.q && inputs.q.length > 0) {
      let tags = await Tag.find({
        where: {
          name: {
            'contains': inputs.q
          }
        },
        select: ['id']
      }).populate('textContentTag', {
        select: ['id']
      });

      let tagIds = [];
      tags.forEach(entry => {
        entry.textContentTag.forEach(tag => {
          tagIds.push(tag.id);
        });});

      textcontents = await TextContent.find({
        where: {
          or: [
            {
              title: {
                'contains': inputs.q
              }
            },
            {
              content: {
                'contains': inputs.q
              }
            },
            {
              id: tagIds
            }
          ],
          group: inputs.group
        },
        select: ['title']
      }).sort('title ASC');
    }
    else
    {
      textcontents = await TextContent.find({
        where: {group: inputs.group},
        select: ['title']
      }).sort('title ASC');
    }
    return textcontents;
  }
};
