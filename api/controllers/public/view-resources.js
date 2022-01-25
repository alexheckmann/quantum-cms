module.exports = {


  friendlyName: 'View resources',


  description: 'Display "Resources" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/documentation'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
