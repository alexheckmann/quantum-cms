module.exports = {
    attributes: {
        status: {
            type: 'string',
            columnType: 'varchar(80)',
            required: true,
            maxLength: 80
        },

        subType: {
            model: 'subType',
            required: true
        },

        invoices: {
            collection: 'invoice',
            via: 'subscription'
        },

        organisation: {
            model: 'organisation',
            required: true
        }
    },
};