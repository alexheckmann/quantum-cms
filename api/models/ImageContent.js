module.exports = {
    attributes: {
        status: { type: 'string', columnType: 'varchar(80)' },
        title: { type: 'string', columnType: 'varchar(80)' },
        content: { type: 'string', columnType: 'varchar(80)' /* TODO spezieller Datentyp */ },
        endpoint: { type: 'string', columnType: 'varchar(80)' },

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