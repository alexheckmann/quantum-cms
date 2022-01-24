module.exports = {


  friendlyName: 'Find organisation',


  description: 'Find the organisation from the current user.',


  inputs: {
  },


  exits: {

  },

  fn: async function () {
    let org = [];
    // find current user
    let user = await User.findOne({ id: this.req.me.id }).populate('organisation');

    if (user.organisation) {
      // creates an array of objects with the values ID and name
      org.push({ name: user.organisation.name, id: user.organisation.id });
      return org;
    } else {
      return org;
    }
  }
};
