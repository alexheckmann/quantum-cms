module.exports = {


    friendlyName: 'Edit',
  
  
    description: 'Edit selected group.',
  
  
    inputs: {
      id: {
        description: 'The group of the user to look up.',
        type: 'number',
        required: true
      }
    },
  
  
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'pages/groups/edit'
      },
      notFound: {
        description: 'No group with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({id}) {
  
      let grp = await WorkingGroup.findOne({ id: id });
      if (!grp) { throw 'notFound'; }
      return {
        grp: grp
      };
    }
  };