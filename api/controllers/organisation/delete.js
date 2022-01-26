module.exports = {


  friendlyName: 'Delete organisation',


  description: 'Delete A Organisation from a user.',


  inputs: {
    id: {
      description: 'The id of the organisation.',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      responseType: 'redirect',
    },
  },


  fn: async function (inputs) {
    // (1) updates the org from the user to NULL
    await User.updateOne({id: this.req.session.userId}).set({
      organisation: null,
      admin: null
    });

    let userGroups = await User.findOne({
      where: {
        id: this.req.me.id
      }
    }).populate('workingGroups');

    console.log(userGroups);

    let userGroupIds = [];
    userGroups.workingGroups.forEach(entry => {
      userGroupIds.push(entry.id);
    });

    await User.removeFromCollection(this.req.me.id, 'workingGroups', userGroupIds);
    await User.removeFromCollection(this.req.me.id, 'adminOf', userGroupIds);

    // (2) gets the org with empoyees and the subscription
    let org = await Organisation.findOne({id: inputs.id}).populate('employees').populate('subscription').populate('workingGroups');
    // (3) checks whether the organisation still has employees
    if (org.employees.length === 0) {
      let groupIds = [];
      org.workingGroups.forEach(entry => {
        groupIds.push(entry.id);
      });
      // (4) destroy all entries of related groups
      await TextContent.destroy({group: groupIds});
      // (4) destroy all workingGroups from the org
      await WorkingGroup.destroy({organisation: org.id});
      // (5) destroy the org
      await Organisation.destroyOne({id: inputs.id});
      // (6) destroy the subscription of the org
      await Subscription.destroyOne().where({id: org.subscription[0].id});
    }
    return '/organisation';
  }
};
