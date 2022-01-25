module.exports = {

  friendlyName: 'Find working groups.',

  description: 'Find working groups.',

  inputs: {
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/groups/index'
    }
  },

  fn: async function () {
    // true if user has a Org
    let hasOrg = false;

    // find current user with all groups
    let user = await User.findOne({ id: this.req.me.id }).populate('adminOf').populate('workingGroups');

    if (user.organisation) {
      hasOrg = true;
    }

    let grps = user.workingGroups;

    if (!user) {
      throw 'not Found: user';
    }
    return {
      user: user,
      grps: grps,
      hasOrg: hasOrg
    };

  }
};
