module.exports = {
    attributes: {
        name: { type: 'string', columnType: 'varchar(80)', required: true },
        secret: { type: 'string', columnType: 'varchar(80)' },
        client_credential: { type: 'string', columnType: 'varchar(80)' },

        subscriptions: {
            collection: 'subscription',
            via: 'organisation'
        },

        invoices: {
            collection: 'invoice',
            via: 'organisation'
        },

        employees: {
            collection: 'user',
            via: 'organisation'
        },

        admins: {
            collection: 'user',
            via: 'admin'
        }
    },
};