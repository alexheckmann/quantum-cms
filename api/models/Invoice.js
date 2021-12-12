module.exports = {
    attributes: {
        amount: { 
            type: 'number',
            columnType: 'DECIMAL (6,2)',
            required: true
        },
        paymentDate: { 
            type: 'number',
            columnType: 'bigint (20)' /*TODO Syntax*/
        },

        subscription: {
            model: 'subscription'
        },

        organisation: {
            model: 'organisation'
        }
    },
};