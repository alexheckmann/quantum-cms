module.exports = {


  friendlyName: 'View features',


  description: 'Display "features" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/about'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
