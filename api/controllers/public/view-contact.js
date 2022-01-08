module.exports = {


  friendlyName: 'View contact',


  description: 'Display "Contact" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/contact'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({layout: 'layouts/public-layout'});

  }


};
