module.exports = {


  friendlyName: 'Find all working groups from the current user.',


  description: 'Find all working groups from the current user.',


  inputs: {},


  exits: {},

  fn: async function () {
    let grps = [];

    // find current user with all groups
    let user = await User.findOne({id: this.req.me.id}).populate('adminOf').populate('workingGroups');

    if (user) {
      // creates an array of objects with the values ID, name and role
      user.workingGroups.forEach(element => {
        grps.push({name: element.name, id: element.id});
      });

      return grps;
    } else {
      throw('Error in findgrps controller -> check \'api/controllers/api/groups/findgrps.js\'.');
    }
  }
};
