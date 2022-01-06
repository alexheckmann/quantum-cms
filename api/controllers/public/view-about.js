module.exports = {


  friendlyName: 'View features',


  description: 'Display "features" page.',


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
