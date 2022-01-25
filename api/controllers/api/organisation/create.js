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


  exits: {},


  fn: async function (inputs) {

    const randomHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    let newInviteCode = randomHex(8);
    let checkOrgs = await Organisation.find({inviteCode: newInviteCode});
    while (checkOrgs.length !== 0) {
      newInviteCode = randomHex(8);
      checkOrgs = await Organisation.find({inviteCode: newInviteCode});
    }
    // create new organisation
    let org = {
      name: inputs.organisation,
      inviteCode: newInviteCode
    };
    org = await Organisation.create(org).fetch();

    // adds the user who created the organisation to it and gives him admin rights.
    let user = await User.updateOne({id: this.req.me.id}).set({
      organisation: org.id,
      admin: org.id
    });
    // data for a new sub to the org
    let subscription = {
      status: 'active',
      subType: 3,
      organisation: org.id
    };
    // create the new sub
    subscription = await Subscription.create(subscription).fetch();
  }
};
