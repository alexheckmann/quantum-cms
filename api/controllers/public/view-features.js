module.exports = {


  friendlyName: 'View about',


  description: 'Display "about" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/features'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
