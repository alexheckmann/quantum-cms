module.exports = {


    friendlyName: 'Find a working group',
  
  
    description: 'Find a working group.',
  
  
    inputs: {
      id : {
        type: 'string',
        required: true
      },
    },
  
  
    exits: {
  
    },
  
    fn: async function (inputs) {
      console.log("ID of the selected group: "+inputs.id);

      // fetches the group with the selected ID
      var grp = await WorkingGroup.findOne({id: inputs.id}).populate('workers').populate('admins');

      console.log("Working Group:")
      console.log(grp);

      // members of the selected group
      let members = [];

      // creates an array of objects with the values ID, name and role
      grp.workers.forEach(element => {
          if (grp.admins.filter(e => e.id === element.id).length > 0) {
            members.push({name: element.fullName, id: element.id, role: "Admin"});
          } else {
            members.push({name: element.fullName, id: element.id, role: "Member"});
          }
      })

      console.log("Members:")
      console.log(members);

      return members;
    }
  };