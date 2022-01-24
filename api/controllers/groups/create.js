module.exports = {


  friendlyName: 'Create a working group.',


  description: 'Create a new working group.',


  inputs: {
    name: {
      description: 'The name of the working group.',
      type: 'string',
      required: true
    },
    description: {
      description: 'The description of the working group.',
      type: 'string',
    },
  },


  exits: {
    redirect: {
      responseType: 'redirect'
    },
  },


  fn: async function (inputs) {

    // create new group
    let grp = {
      name: inputs.name,
      description: inputs.description,
      organisation: this.req.me.organisation
    };
    grp = await WorkingGroup.create(grp).fetch();

    // adds the user who created the working group to it and gives him admin rights.
    await User.addToCollection(this.req.me.id, 'workingGroups', grp.id);
    await User.addToCollection(this.req.me.id, 'adminOf', grp.id);

    if (!grp) {
      throw 'notFound';
    }
    throw {
      redirect: '/groups'
    };
  }

};
