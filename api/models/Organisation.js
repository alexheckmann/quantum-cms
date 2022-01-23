module.exports = {

  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(80)',
      maxLength: 80,
      required: true
    },
    inviteCode: {
      type: 'string',
      columnType: 'varchar(8)',
      maxLength: 8,
      unique: true,
      required: true
    },
    subscription: {
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
