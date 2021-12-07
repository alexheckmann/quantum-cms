module.exports = {


    friendlyName: 'Edit',
  
  
    description: 'Edit organisation.',
  
  
    inputs: {
      id: {
        description: 'The organisation of the user to look up.',
        type: 'number',
        required: true
      }
    },
  
  
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'pages/organisation/edit'
      },
      notFound: {
        description: 'No organisation with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({id}) {
  
      let org = await Organisation.findOne({ id: id });
      if (!org) { throw 'notFound'; }
      return {
        org: org
      };
    }
  };