module.exports = {

  friendlyName: 'Find',

  description: 'Find organisation.',

  inputs: {
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/organisation/index'
    }
  },

  fn: async function () {
    let org;
    let users;
    // the current user
    let user = await User.findOne({ id: this.req.session.userId }).populate('organisation').populate('admin');

    if (!!user.organisation) {
      // the organisation to the current user
      org = await Organisation.findOne({ id: user.organisation.id });

      // all user with same org
      users = await User.find({
        where: { organisation: user.organisation.id },
        select: ['fullName', 'organisation']
      }).populate('organisation').populate('admin');

      // sub to org
      let sub = await Subscription.findOne({ organisation: org.id }).populate('subType');
      console.log('step 1');
      return {
        message: '',
        user: user,
        org: org,
        users: users,
        sub: sub
      };

    } else {
      sails.log.debug('User has no organisation.');
      return {
        message: 'User has no organisation.',
        user: user,
        org: org,
        users: users
      };
    }
  }
};
