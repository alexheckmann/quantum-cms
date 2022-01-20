module.exports = {


  friendlyName: 'View about us page',


  description: 'Display "about us" page.',


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
