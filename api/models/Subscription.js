module.exports = {
    attributes: {
        status: { type: 'string', columnType: 'varchar(80)', required: true },

        subType: {
            model: 'subType'
        },

        invoices: {
            collection: 'invoice',
            via: 'subscription'
        },

        organisation: {
            model: 'organisation'
        }
    },
};