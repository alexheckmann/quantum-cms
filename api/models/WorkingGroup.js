module.exports = {
    attributes: {
        description: {
            type: 'string',
            columnType: 'varchar(512)',
            maxLength: 512
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