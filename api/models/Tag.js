module.exports = {
  attributes: {
    colour: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      required: true
    },
    name: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      required: true
    },

    textContentTag: {
      collection: 'textContent',
      via: 'tags'
    },

    imageContentTag: {
      collection: 'imageContent',
      via: 'tags'
    }

  },
};
