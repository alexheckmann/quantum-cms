module.exports = {


  friendlyName: 'View about us',


  description: 'Display "About Us" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/about'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
