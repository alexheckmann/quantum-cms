module.exports = {


  friendlyName: 'Find organisation members.',


  description: 'Find all members from the organisation',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
  },


  exits: {},

  fn: async function (inputs) {
    // fetches the org with the selected ID
    let org = await Organisation.findOne({id: inputs.id}).populate('employees').populate('admins');

    console.log('Organisation:');
    console.log(org);

    // members of the organisation
    let members = [];

    // creates an array of objects with the values ID, name and role
    if (org.employees) {
      org.employees.forEach(element => {
        if (org.admins.filter(e => e.id === element.id).length > 0) {
          members.push({name: element.fullName, id: element.id, role: 'Admin'});
        } else {
          members.push({name: element.fullName, id: element.id, role: 'Member'});
        }
      });
    }

    console.log('Members:');
    console.log(members);

    return members;
  }
};
