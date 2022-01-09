module.exports = {


  friendlyName: 'View privacy',


  description: 'Display "Privacy policy" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/legal/privacy'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
