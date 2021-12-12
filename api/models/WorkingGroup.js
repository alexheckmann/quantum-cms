module.exports = {
    attributes: {
        description: {
            type: 'string',
            columnType: 'varchar(256)',
            maxLength: 256
        },
        name: {
            type: 'string',
            columnType: 'varchar(80)',
            required: true,
            maxLength: 80
        },

        workers: {
            collection: 'user',
            via: 'workingGroups'
        },

        admins: {
            collection: 'user',
            via: 'adminOf'
        }
    },
};