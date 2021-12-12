module.exports = {
    attributes: {
      title: { 
        type: 'string',
        columnType: 'varchar(80)',
        required: true
      },
      content: { 
        type: 'string', /* TODO spezieller Datentyp */
        columnType: 'varchar(1024)',
        required: true
      },

      newestVersion: {
        model: 'imageContent',
        required: true
      }
    },
  };