module.exports = {
  attributes: {
    title: { type: 'string', columnType: 'varchar(80)' },
    content: { type: 'string', columnType: 'varchar(1024)' },
    newestVersion: {
      model: 'textcontent'
    }
  },
};
