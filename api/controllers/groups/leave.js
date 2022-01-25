module.exports = {


  friendlyName: 'Leave group',


  description: 'User leaves a working group.',


  inputs: {
    id: {
      description: 'The id of the working group.',
      type: 'number',
      required: true
    },
  },


  exits: {
    /* success: {
            responseType: 'view',
            viewTemplatePath: 'pages/groups/index'
        }, */
  },


  fn: async function (inputs) {
    // the working group
    let grp = await WorkingGroup.findOne({ id: inputs.id }).populate('workers').populate('admins');

    if ((grp.workers.length === 1 && grp.admins.length === 0) || (grp.workers.length === 1 && grp.admins.length === 1)) {
      await TextContent.destroy({group: grp.id});
      await WorkingGroup.destroyOne({id: grp.id});
    } else {
      await User.removeFromCollection(this.req.me.id, 'workingGroups', inputs.id);
      await User.removeFromCollection(this.req.me.id, 'adminOf', inputs.id);
    }

    return true;
    // the current user
    // let user = await User.findOne({ id: this.req.me.id }).populate('workingGroups').populate('adminOf');

    // if (!user) {throw 'notFound user: ' + this.req.me.id;}

    // the groups of the user
    // let grps = user.workingGroups;

    /* return {
            user: user,
            grps: grps
        }; */
  }
};
