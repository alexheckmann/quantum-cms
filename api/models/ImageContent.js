module.exports = {
    attributes: {
        status: { 
            type: 'string',
            columnType: 'varchar(80)',
            isIn: ['active', 'inactive'],
            required: true
        },
        title: {
            type: 'string',
            columnType: 'varchar(80)',
            maxLength: 80,
            required: true
        },
        content: { 
            type: 'string',
            columnType: 'varchar(80)', /* TODO spezieller Datentyp */
            maxLength: 80
        },
        endpoint: { 
            type: 'string',
            columnType: 'varchar(80)',
            maxLength: 80,
            required: true
        },

        tags: {
            collection: 'tag',
            via: 'imageContentTag'
        },

        oldversions: {
            collection: 'imagecontentarchive',
            via: 'newestVersion'
        },

        author: {
            model: 'user'
        },

        updatedFrom: {
            model: 'user'
        },
    },
};