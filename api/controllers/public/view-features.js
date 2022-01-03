module.exports = {


  friendlyName: 'View about',


  description: 'Display "about" page.',


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
