module.exports = {


  friendlyName: 'View contact',


  description: 'Display "Contact" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/contact'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
