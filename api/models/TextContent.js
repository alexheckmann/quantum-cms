module.exports = {
  attributes: {
    title: {type: 'string', columnType: 'varchar(80)'},
    content: {type: 'string', columnType: 'varchar(1024)'},
    endpoint: {type: 'string', columnType: 'varchar(80)'},
    status: {type: 'string', columnType: 'varchar(80)'},

    oldversions: {
      collection: 'textcontentarchive',
      via: 'newestVersion'
    },

    author: {
      model: 'user'
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
