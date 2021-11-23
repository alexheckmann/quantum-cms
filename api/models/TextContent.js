module.exports = {
    attributes: {
        version: { type: 'string', columnType: 'varchar(80)'/*TODO*/ },
        title: { type: 'string', columnType: 'varchar(80)' },
        content: { type: 'string', columnType: 'varchar(1024)' },
        endpoint: { type: 'string', columnType: 'varchar(80)' },
        status: { type: 'string', columnType: 'varchar(80)' },
    },
};