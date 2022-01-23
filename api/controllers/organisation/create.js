module.exports = {


  friendlyName: 'Create organisation',


  description: 'Create a new organisation.',


  inputs: {
    organisation: {
      description: 'The name of the organisation.',
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/organisation/show'
    },
  },


  fn: async function (inputs) {
    // create new organisation
    let org = {
      name: inputs.organisation,
    };
    org = await Organisation.create(org).fetch();
    sails.log.debug('Created Organisation:');
    sails.log.debug(org);

    // adds the user who created the organisation to it and gives him admin rights.
    let user = await User.updateOne({id: this.req.me.id }).set({
      organisation: org.id,
      admin: org.id
    });

    sails.log.debug('User:');
    sails.log.debug(user);

    if (!org) { throw 'notFound'; }
    return {
      message: 'Organisation successfully created.',
      org: org
    };
  }

};
