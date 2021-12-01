module.exports = {


    friendlyName: 'Destroy',
  
  
    description: 'Destroy a text content.',
  
  
    inputs: {
      id: {
        description: 'The id of the text content.',
        type: 'number',
        required: true
      },
    },
  
  
    exits: {
      /* success: {
        responseType: 'view',
        viewTemplatePath: 'pages/textcontent/index'
      }, */
      success: {
        responseType: 'redirect',
      },
    },
  
  
    fn: async function ({id}) {
      sails.log.debug("Destroy textcontent: "+id)
      let textcontent = await TextContent.destroyOne({id: id});
      if (textcontent) {
         sails.log("Destroyed: "+textcontent); 
         return "/textcontent";
      } else {
        sails.log("Can not destroy: "+id);
        return "/textcontent";
      };
    }
  };