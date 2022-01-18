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
    var org;
    var users;
    // gets the current user
    let user = await User.findOne({ id: this.req.session.userId }).populate('organisation').populate('admin');

    if (!!user.organisation) {
      // gets the organisation to the current user
      org = await Organisation.findOne({ id: user.organisation.id });

      // all user with same org
      users = await User.find({
        where: { organisation: user.organisation.id },
        select: ['fullName', 'organisation']
      }).populate('organisation').populate('admin');


      sails.log.debug('user.organisation: ' + user.organisation.id)
      sails.log.debug(org)

      sails.log.debug('Members:')
      sails.log.debug(users)
      return {
        message: "",
        user: user,
        org: org,
        users: users
      };

    } else {
      sails.log.debug('User has no organisation.')
      
      return {
        // TODO
        message: "User has no organisation.",
        user: user,
        org: org,
        users: users
      };
    }

  }
}