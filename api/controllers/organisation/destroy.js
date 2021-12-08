module.exports = {


    friendlyName: 'Destroy',
  
  
    description: 'Destroy a organisation.',
  
  
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
  
  
    fn: async function ({id}) {
      sails.log.debug("Destroy organisation: "+id)
      let org = await Organisation.destroyOne({id: id});

      // TODO if user == admin -> delete else update to organisation empty
      

      if (org) {
         sails.log("Destroyed organisation: "+org); 
         return "/welcome";
      } else {
        sails.log("Can not destroy organisation: "+id);
        return "/welcome";
      };
    }
  };