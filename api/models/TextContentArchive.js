module.exports = {
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      required: true,
    },
    content: {
      type: 'string',
      columnType: 'varchar(1024)',
      maxLength: 1024,
      required: true,
    },

    newestVersion: {
      model: 'textcontent',
      required: true
    }
  },
};
