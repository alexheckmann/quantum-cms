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


    fn: async function (inputs) {
        // create new organisation
        sails.log.debug("Create new organisation.")
        let org = {
            name: inputs.name,
        };
        org = await Organisation.create(org).fetch();
        sails.log.debug('Created Organisation:')
        sails.log.debug(org)

        // adds the user who created the organisation to it and gives him admin rights.
        let user = await User.updateOne({ id: this.req.me.id }).set({
            organisation: org.id,
            admin: org.id
        });

        // data for a new sub to the org
        let subscription = {
            status: 'active',
            subType: 3,
            organisation: org.id
        }
        // create the new sub
        subscription = await Subscription.create(subscription).fetch();

        sails.log.debug('User:')
        sails.log.debug(user)

        if (!org) { throw 'notFound'; }
        return {
            message: "Organisation successfully created.",
            org: org,
            sub: subscription
        };
    }

};