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

    // create new organisation
    let org = {
      name: inputs.organisation,
      inviteCode: randomHex(8)
    };
    console.log('create org');
    org = await Organisation.create(org).fetch();
    console.log(org);
    // adds the user who created the organisation to it and gives him admin rights.
    let user = await User.updateOne({id: this.req.me.id}).set({
      organisation: org.id,
      admin: org.id
    });
    console.log('create sub');
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
