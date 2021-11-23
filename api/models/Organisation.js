module.exports = {
    attributes: {
        name: { type: 'string', columnType: 'varchar(80)', required: true },
        secret: { type: 'string', columnType: 'varchar(80)' },
        client_credential: { type: 'string', columnType: 'varchar(80)' },
    },
};