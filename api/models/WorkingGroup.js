module.exports = {
    attributes: {
        description: { type: 'string', columnType: 'varchar(256)'},
        name: { type: 'string', columnType: 'varchar(80)', required: true},

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