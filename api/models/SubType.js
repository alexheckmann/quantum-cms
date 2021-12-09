module.exports = {
    attributes: {
        name: { 
            type: 'string',
            columnType: 'varchar(80)',
            maxLength: 80,
            required: true
        },
        price: { 
            type: 'number',
            columnType: 'DECIMAL (6,2)',
            required: true
        },

        subscriptions: {
            collection: 'subscription',
            via: 'subType'
        }
    },
};