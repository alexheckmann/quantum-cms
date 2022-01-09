module.exports = {


  friendlyName: 'View terms',


  description: 'Display "Legal terms" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/legal/terms'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
