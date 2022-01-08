module.exports = {
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      description: 'The description of the content.',
      required: true
    },
    content: {
      type: 'string',
      columnType: 'varchar(1024)',
      maxLength: 1024,
      description: 'The text content.',
      required: true
    },
    endpoint: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      required: true
    },
    status: {
      type: 'string',
      columnType: 'varchar(80)',
      isIn: ['active', 'inactive'],
      required: true
    },
    oldversions: {
      collection: 'textcontentarchive',
      via: 'newestVersion'
    },

    author: {
      model: 'user',
      required: true
    },

    updatedFrom: {
      model: 'user'
    },

    tags: {
      collection: 'tag',
      via: 'textContentTag'
    }

  },
};
