module.exports = {

  friendlyName: 'Invite code',

  description: 'Join an organisation via invite code.',

  inputs: {
    inviteCode: {
      type: 'string',
      length: 8,
      required: true
    }
  },

  exits: {
    success: {},
    notFound: {
      description: 'No text content with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({inviteCode}) {
    // set org and admin for each Member null
    let org = await Organisation.findOne({where: {inviteCode: inviteCode}, select: ['id', 'inviteCode']});

    if (!org) {
      throw 'notFound';
    }
    let user = await User.updateOne({id: this.req.me.id}).set({
      organisation: org.id
    });


  }
};
