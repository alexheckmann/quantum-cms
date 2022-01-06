module.exports = {


  friendlyName: 'View faq',


  description: 'Display "FAQ" page.',


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
